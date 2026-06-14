require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Anthropic = require('@anthropic-ai/sdk');

const app = express();
const PORT = process.env.PORT || 3001;
const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// ─── CORS ────────────────────────────────────────────────────────────────────
const allowedOrigins = process.env.FRONTEND_URL
  ? [process.env.FRONTEND_URL]
  : ['http://localhost:5173', 'http://localhost:4173'];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV !== 'production') {
      callback(null, true);
    } else {
      callback(new Error(`CORS policy: Origin ${origin} not allowed`));
    }
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json({ limit: '1mb' }));

// ─── COMPRESSED SYSTEM PROMPT ────────────────────────────────────────────────
const SYSTEM_PROMPT = `You are the GIMI Partner Acquisition Manager. Generate partnership recommendations with buying signal detection, warm path analysis, timing assessment, and activation tier assignment.

GIMI: Global Innovation Management Institute. ISO 56002+ standard body. 18K+ members, 60+ countries, 140+ certified universities, 1.2K+ corporations.

OFFERINGS:
- Organizations: OMC (Levels 1-4, $2.5K/level)
- Individuals: CIP, CCIO, CFP/CFL, IMI
- Partners get: Referral revenue, directory, co-marketing, standard preview, IMBOOK, community, launch support

EXISTING PARTNERS (EXCLUDE): 
Government: Gobernación del Atlántico, IEL, ACATE, Saudi Aramco, EDB Singapore, 22 Barcelona, Mejoremos Guate, Minciencias, Dubai Government Excellence
Corporates: Philips, Rakuten, Xerox, IBM, Johnson Controls, Liberty Mutual, RTA, Cigna, Boehringer Ingelheim, Hamilton Beach, Roche, Alibaba.com, P&G, HSBC
Universities: Hult IBS, Asian Institute of Management, Yonsei, CESA, University of Calgary, FDC, Trento, Tecnológico de Monterrey, Makkah Chamber, Toronto, Xavier, Thunderbird, U. San Buenaventura Medellín
CTPs: ALVA, UCOTRA, IXL Center, Clarus
Strategic Partners: IPMA, IEL

ASSESSMENT FRAMEWORK:
1. BUYING SIGNALS: Identify 2-3 recent observable signals (Strong/Moderate/Weak). If none, state explicitly.
2. WARM PATH: Check for intro via existing GIMI partner, geographic proximity, shared events, LinkedIn 2nd-degree, or GIMI-certified professionals. State plainly.
3. TIMING: Assess best outreach window. Assign: Approach now | Approach in [timeframe] | Monitor
4. ACTIVATION TIER: Fast Track (<3mo, strong signals+warm path) | Standard (3-6mo, good fit no warmpath) | Long Cycle (6-18mo, formal procurement)
5. OBJECTIONS: Select 2-3 most likely for that org's profile with counters.
6. OUTREACH: All 3 touches required. Touch 1 cold outreach. Touch 2 (day 7) adds org-specific value. Touch 3 (day 14) max 2 sentences.

CONTACT CHANNELS: Include only if verifiable (LinkedIn, website contact, email if publicly listed). Mark unverified. Omit if not found. Never invent.

RULES: No invented names/emails/URLs. RESEARCHED or HYPOTHETICAL only. No existing partners. Ground in GIMI offerings. Honest scores/flags. Return ONLY valid JSON.

OUTPUT SCHEMA:
{
  "recommendations": [{
    "id": 1,
    "organizationName": "string",
    "category": "Government Association | Corporate | University | Certified Training Partner | Strategic Brand Partner",
    "countryRegion": "string",
    "researchStatus": "RESEARCHED | HYPOTHETICAL",
    "contactStatus": "uncontacted",
    "contactEmail": "string or null",
    "linkedinUrl": "string or null",
    "organizationProfile": "string (3-5 sentences)",
    "whyTheyFit": ["reason_1", "reason_2", "reason_3"],
    "fitScore": 1-10,
    "fitScoreJustification": "string (2-3 sentences)",
    "buyingSignals": [{"signal": "string", "strength": "Strong | Moderate | Weak"}],
    "warmPath": "string",
    "timingAssessment": {"recommendation": "Approach now | Approach in [timeframe] | Monitor", "rationale": "1 sentence"},
    "activationTier": {"tier": "Fast Track | Standard | Long Cycle", "rationale": "1 sentence"},
    "redFlags": [],
    "predictedObjections": [{"objection": "string", "counter": "string"}],
    "outreachSequence": {
      "touch1": {"subject": "string", "body": "string (150-200 words)"},
      "touch2": {"subject": "Re: [subject]", "body": "string (max 3 sentences, org-specific value)"},
      "touch3": {"subject": "Re: [subject]", "body": "string (max 2 sentences, alternative path)"}
    }
  }]
}`;

// ─── ROUTES ──────────────────────────────────────────────────────────────────
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'GIMI Partnership Scout API', version: '2.0.0' });
});

app.post('/api/scout', async (req, res) => {
  const { partnerType, region, sectorFocus, similarTo, numRecommendations } = req.body;

  // Validate required fields
  if (!partnerType || !region || !numRecommendations) {
    return res.status(400).json({
      error: 'Missing required fields',
      required: ['partnerType', 'region', 'numRecommendations'],
    });
  }

  const count = parseInt(numRecommendations, 10);
  if (isNaN(count) || count < 1 || count > 5) {
    return res.status(400).json({ error: 'numRecommendations must be between 1 and 5.' });
  }

  const userMessage = [
    `Partner Type: ${partnerType}`,
    `Region: ${region}`,
    `Sector Focus: ${sectorFocus?.trim() || 'Not specified'}`,
    `Similar To: ${similarTo?.trim() || 'Not specified'}`,
    `Number of Recommendations: ${count}`,
  ].join('\n');

  try {
    // Agentic loop: handle tool calls if Claude uses them
    const message = await runAgent(userMessage);
    return res.json(message);
  } catch (err) {
    console.error('Agent error:', err);
    return res.status(500).json({
      error: err?.status === 401
        ? 'Invalid API key. Check ANTHROPIC_API_KEY environment variable.'
        : 'Failed to generate recommendations. Please try again.',
    });
  }
});

// ─── AGENTIC LOOP ────────────────────────────────────────────────────────────
async function runAgent(userMessage, maxIterations = 3) {
  let messages = [{ role: 'user', content: userMessage }];
  let iteration = 0;

  while (iteration < maxIterations) {
    iteration++;

    // Call Claude with tools (if available via environment flag)
    const messageResponse = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 8000,
      system: SYSTEM_PROMPT,
      tools: process.env.ENABLE_WEB_SEARCH === 'true' ? [
        {
          type: 'web_search',
          name: 'web_search',
          description: 'Search the web for current information about organizations',
        },
      ] : undefined,
      messages: messages,
    });

    // Check if Claude wants to use tools
    if (messageResponse.stop_reason === 'tool_use') {
      const toolUse = messageResponse.content.find(block => block.type === 'tool_use');
      
      if (toolUse && toolUse.name === 'web_search') {
        // Execute web search (mock for now, would integrate with real tool)
        const searchResult = await performWebSearch(toolUse.input.query);

        // Add assistant response and tool result to messages
        messages.push({ role: 'assistant', content: messageResponse.content });
        messages.push({
          role: 'user',
          content: [{
            type: 'tool_result',
            tool_use_id: toolUse.id,
            content: searchResult,
          }],
        });

        // Continue loop for next iteration
        continue;
      }
    }

    // Check if response is final (text with JSON)
    const textBlock = messageResponse.content.find(block => block.type === 'text');
    if (textBlock && textBlock.text) {
      try {
        // Extract and parse JSON from response
        const cleaned = textBlock.text.replace(/```json|```/g, '').trim();
        const parsed = JSON.parse(cleaned);
        return parsed;
      } catch (parseErr) {
        console.error('JSON parse error. Raw response:', textBlock.text);
        throw new Error('Agent returned malformed JSON. Please retry.');
      }
    }

    // If no progress made, exit loop
    if (iteration >= maxIterations) {
      throw new Error('Agent reached maximum iterations without producing valid JSON.');
    }
  }
}

// ─── MOCK WEB SEARCH (Replace with real implementation if ENABLE_WEB_SEARCH=true) ───
async function performWebSearch(query) {
  // In production, integrate with real web search API
  // For now, return mock data
  console.log('Web search query:', query);
  return `Mock search results for: "${query}". In production, integrate with real search API (Bing, Google, etc.).`;
}

// ─── START ───────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅  GIMI Partnership Scout API running on port ${PORT}`);
  console.log(`   Health check: http://localhost:${PORT}/health`);
  console.log(`   Agentic loop: ${process.env.ENABLE_WEB_SEARCH === 'true' ? 'ENABLED' : 'DISABLED'}`);
  console.log(`   System prompt: COMPRESSED (~2.5K tokens)`);
});
