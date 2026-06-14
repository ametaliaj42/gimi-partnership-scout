/*
 * Realistic sample output representative of live Claude API responses.
 * Five profiles cover all five partner categories, enabling full UI demonstration
 * regardless of which partner type or count (1–5) the user selects in the form.
 */
export const MOCK_RECOMMENDATIONS = [
  {
    id: 1,
    organizationName: "National University of Singapore (NUS)",
    category: "University",
    countryRegion: "Singapore",
    researchStatus: "RESEARCHED",
    contactStatus: "uncontacted",
    contactEmail: "partnerships@nus.edu.sg",
    linkedinUrl: "https://linkedin.com/company/national-university-of-singapore",
    organizationProfile:
      "The National University of Singapore is a leading global research university consistently ranked in the world's top 15. NUS enrols over 40,000 students across 17 faculties and schools. Its Business School operates one of Asia's most respected MBA and Executive Education portfolios, with innovation and entrepreneurship embedded across the curriculum through NUS Enterprise. The university maintains extensive corporate and government partnerships, including deep ties with Singapore's Economic Development Board.",
    whyTheyFit: [
      "NUS Business School already delivers innovation management content at the executive education level, making GIMI certification a direct, value-adding credential layer rather than a curriculum replacement.",
      "GIMI's existing government partnership with Singapore's EDB provides a warm institutional channel into NUS, given the close EDB–university collaboration in Singapore's national innovation strategy.",
      "The university's 40,000-strong student body and corporate partner network create a compounding pipeline: students who earn GIMI credentials enter companies that become natural OMC certification prospects.",
    ],
    fitScore: 9,
    fitScoreJustification:
      "NUS scores in the top tier due to global prestige, direct mission alignment, and a pre-existing warm channel through the Singapore EDB partnership. The executive education structure shortens decision cycles compared to undergraduate curriculum integrations. Slight deduction reflects NUS's selectivity around third-party credential partnerships.",
    redFlags: [
      "NUS maintains existing relationships with competing certification bodies including PMI and IEEE — the GIMI pitch must lead with ISO 56002 alignment and global standard-body status, not content quality alone.",
      "Partnership approval at NUS typically requires faculty committee review, extending decision cycles to 6–12 months.",
    ],
    outreachEmail: {
      subject: "GIMI Certified University Partnership — Innovation Management Credentials for NUS Programs",
      body: `Dear Partnerships Office,

NUS Enterprise's work commercialising academic research and building Singapore's innovation ecosystem reflects the same institutional commitment that GIMI's certification framework is designed to formalise and scale.

GIM Institute (GIMI-IAOIP) is the world's first ISO 56002+ certified global standard body for innovation management, with 18,000+ certified professionals across 60 countries and established government partnerships including Singapore's Economic Development Board.

A Certified University Partnership with NUS would allow MBA, Executive Education, and postgraduate students to earn GIMI credentials alongside their NUS qualification — adding an internationally portable, ISO-backed standard to programs that already lead the region.

We would welcome 30 minutes to explore what a tailored partnership structure might look like for NUS and whether a pilot with one or two existing programs would be the right entry point.

Would your team be available for a brief call in the coming weeks?

Best regards,
GIMI Partnerships Team
giminstitute.org`,
    },
  },
  {
    id: 2,
    organizationName: "Asian Development Bank Institute (ADBI)",
    category: "Government Association",
    countryRegion: "Japan (Pan-Asia mandate)",
    researchStatus: "RESEARCHED",
    contactStatus: "uncontacted",
    contactEmail: "partnerships@adbi.org",
    linkedinUrl: "https://linkedin.com/company/asian-development-bank-institute",
    organizationProfile:
      "The Asian Development Bank Institute is the research and capacity-building arm of the Asian Development Bank, headquartered in Tokyo with a mandate spanning 49 member economies. ADBI designs and delivers executive training programs for government officials, policymakers, and public sector leaders across the Asia-Pacific region. Its programming increasingly focuses on digital transformation, sustainable innovation, and economic modernisation. ADBI publishes widely cited policy research and hosts regular high-level forums attended by ministerial-level delegations.",
    whyTheyFit: [
      "ADBI's mandate to build government capacity across 49 economies represents an unmatched geographic multiplier for GIMI — one partnership agreement could generate certified participants across dozens of countries simultaneously.",
      "ADBI's growing digital innovation and economic modernisation programs align directly with GIMI's OMC Levels 1 and 2, which target public sector organisations at the beginning of their structured innovation journey.",
      "GIMI's existing government partnerships in Singapore (EDB) and the UAE (Dubai Government Excellence) serve as credible Asia-Pacific and Middle East reference points, satisfying ADBI's typical procurement due diligence requirements.",
    ],
    fitScore: 8,
    fitScoreJustification:
      "ADBI's pan-regional mandate creates exceptional geographic value, and mission alignment with GIMI's public sector innovation standards is strong. Score reflects a single material uncertainty: as an ADB subsidiary, ADBI operates under multilateral procurement frameworks that can extend onboarding timelines significantly.",
    redFlags: [
      "ADBI's multilateral procurement rules may require GIMI to complete an approved-vendor registration process before any formal engagement — a process that typically runs 3–6 months.",
    ],
    outreachEmail: {
      subject: "Innovation Management Certification for Asia-Pacific Government Officials — GIMI × ADBI",
      body: `Dear ADBI Partnerships Office,

ADBI's executive training programs for Asia-Pacific government officials reach exactly the institutional leaders most positioned to embed systematic innovation management across their ministries and agencies.

GIM Institute (GIMI-IAOIP) is the world's first ISO 56002+ certified global standard body for innovation management, with established government partnerships including Singapore's Economic Development Board and the Dubai Government Excellence Program.

We would like to explore integrating GIMI's certification framework into ADBI's capacity-building curriculum — equipping public sector leaders across the Asia-Pacific with a recognised, measurable standard for managing innovation. Even a two- or three-economy pilot would generate meaningful comparative data and stakeholder visibility.

Would your team be open to an introductory conversation at your convenience?

Best regards,
GIMI Partnerships Team
giminstitute.org`,
    },
  },
  {
    id: 3,
    organizationName: "Siemens AG — Corporate Innovation Division",
    category: "Corporate",
    countryRegion: "Germany (Global operations)",
    researchStatus: "RESEARCHED",
    contactStatus: "uncontacted",
    contactEmail: "innovation.partnerships@siemens.com",
    linkedinUrl: "https://linkedin.com/company/siemens",
    organizationProfile:
      "Siemens AG is a global technology conglomerate operating in over 200 countries with approximately 320,000 employees and annual revenue exceeding €75 billion. The company operates a dedicated innovation management function through its Corporate Technology division and has publicly committed to structured innovation frameworks as part of its Vision 2030 strategy. Siemens runs internal innovation academies and regularly certifies employees in Lean, Six Sigma, and agile methodologies. The company has active innovation partnerships with universities and industry bodies across Europe, Asia, and the Americas.",
    whyTheyFit: [
      "Siemens's existing culture of structured professional certification (Lean, Six Sigma, agile) demonstrates institutional appetite for the exact type of credential that GIMI's CIP and CCIO programs provide — the pitch is an extension of a known behaviour, not a new concept.",
      "GIMI's OMC framework would complement Siemens's internal innovation auditing processes, providing a third-party ISO 56002+ validated maturity level that carries external credibility with clients and regulators.",
      "Siemens's scale — 320,000 employees across 200 countries — means a corporate agreement would generate volume across GIMI's individual certification tiers that no single university partnership could match.",
    ],
    fitScore: 8,
    fitScoreJustification:
      "Siemens's certification culture, global scale, and existing structured innovation frameworks make them a high-activation-likelihood corporate prospect. Score reflects that large enterprise BD cycles at Siemens typically involve procurement, legal, and HR stakeholders, extending timelines to 9–18 months from first contact.",
    redFlags: [
      "Enterprise procurement at Siemens requires multi-stakeholder sign-off across HR, Legal, and divisional leadership — first contact should be directed to Corporate Learning or the Innovation Division, not central procurement.",
      "Siemens has existing relationships with major consulting firms (McKinsey, BCG) who may already provide internal innovation frameworks, requiring GIMI to differentiate on ISO standard-body status and independent credentialing.",
    ],
    outreachEmail: {
      subject: "GIMI Innovation Certification Partnership — ISO 56002+ Credentials for Siemens Professionals",
      body: `Dear Innovation Partnerships Team,

Siemens's structured approach to employee development — including Lean, Six Sigma, and agile credentialing — reflects an institutional commitment to measurable professional standards that GIMI's innovation management certification is specifically designed to complement.

GIM Institute (GIMI-IAOIP) is the world's first ISO 56002+ certified global standard body for innovation management, with 18,000+ certified professionals across 1,200+ corporations in 60 countries.

We believe a corporate partnership would allow Siemens to extend its existing certification culture into innovation management — equipping your innovation teams with an externally validated, ISO-backed credential that carries credibility across industries, clients, and geographies.

We would welcome the opportunity to share how similar arrangements have worked with peer organisations and discuss what a pilot program structure might look like for Siemens.

Best regards,
GIMI Partnerships Team
giminstitute.org`,
    },
  },
  {
    id: 4,
    organizationName: "Kaizen Institute",
    category: "Certified Training Partner",
    countryRegion: "Portugal (Global — 40+ countries)",
    researchStatus: "RESEARCHED",
    contactStatus: "uncontacted",
    contactEmail: "partnerships@kaizeninstitute.com",
    linkedinUrl: "https://linkedin.com/company/kaizen-institute",
    organizationProfile:
      "Kaizen Institute is a global management consulting and training organisation founded in 1985 and operating in over 40 countries. The institute specialises in continuous improvement, operational excellence, and innovation management consulting, serving clients across manufacturing, healthcare, retail, and financial services. Kaizen Institute delivers structured training programs and professional certifications through its global network of consultants. Its innovation consulting practice has expanded significantly since 2018, with dedicated teams in Europe, Asia, and the Americas working on corporate innovation strategy.",
    whyTheyFit: [
      "Kaizen Institute's expanding innovation consulting practice creates immediate demand for a globally recognised credential to attach to client engagements — GIMI certification provides that credential without Kaizen needing to build its own assessment framework.",
      "The institute's 40-country presence spans several GIMI geographic white spaces, particularly in Southern Europe and Sub-Saharan Africa, where GIMI has few or no existing Certified Training Partners.",
      "Kaizen Institute's existing client relationships across manufacturing, healthcare, and financial services map directly onto the corporate sectors GIMI is targeting for OMC certification — the partner pipeline and the CTP pipeline reinforce each other.",
    ],
    fitScore: 8,
    fitScoreJustification:
      "Mission alignment between Kaizen Institute's continuous improvement ethos and GIMI's innovation management standards is strong, and the geographic footprint fills concrete GIMI white spaces. Activation likelihood is high given the direct commercial incentive for Kaizen to attach a third-party credential to its innovation consulting engagements.",
    redFlags: [
      "Kaizen Institute's core brand is built on the Kaizen methodology — GIMI certification must be positioned as complementary rather than a replacement of their proprietary approach to avoid internal resistance.",
    ],
    outreachEmail: {
      subject: "GIMI Certified Training Partner Programme — Innovation Credentials for Kaizen Institute Clients",
      body: `Dear Partnerships Office,

Kaizen Institute's expanding innovation consulting practice — now active across 40+ countries — operates in precisely the space where a globally recognised, ISO-backed innovation credential adds the most tangible value to client engagements.

GIM Institute (GIMI-IAOIP) is the world's first ISO 56002+ certified global standard body for innovation management, with 18,000+ certified professionals across 60 countries. Our Certified Training Partner programme enables approved training providers to deliver GIMI-accredited courses and issue professional development credits recognised worldwide.

A partnership would allow Kaizen Institute to offer GIMI credentials to clients completing your innovation consulting programs — attaching independent, internationally portable certification to work your teams are already delivering.

We would welcome a conversation about how the CTP framework operates and whether the structure fits Kaizen Institute's current consulting and training model.

Best regards,
GIMI Partnerships Team
giminstitute.org`,
    },
  },
  {
    id: 5,
    organizationName: "Project Management Institute (PMI)",
    category: "Strategic Brand Partner",
    countryRegion: "United States (Global — 180+ countries)",
    researchStatus: "RESEARCHED",
    contactStatus: "uncontacted",
    contactEmail: "partnerships@pmi.org",
    linkedinUrl: "https://linkedin.com/company/project-management-institute",
    organizationProfile:
      "The Project Management Institute is the world's leading professional association for project management, with over 700,000 members and credential holders across 180 countries. PMI offers globally recognised certifications including the PMP (Project Management Professional) and has expanded its portfolio into agile, strategy, and transformation domains. PMI operates a global network of chapters, publishes research through its PMI Pulse of the Profession report, and runs the PMI Global Summit attended by tens of thousands of practitioners annually. In recent years PMI has positioned itself as a partner for organisations navigating strategic change and innovation.",
    whyTheyFit: [
      "PMI's 700,000 member base represents the single largest untapped audience for GIMI's individual certifications — professionals already committed to structured professional development are the highest-conversion target for an adjacent credential.",
      "PMI's strategic expansion into transformation and innovation domains creates natural content and event collaboration opportunities, including joint research on innovation management as a professional discipline.",
      "A co-marketing agreement with PMI would give GIMI access to PMI's chapter network across 180 countries at a fraction of the cost of organic geographic expansion, accelerating GIMI's path to one million certified professionals.",
    ],
    fitScore: 9,
    fitScoreJustification:
      "PMI is arguably the highest-leverage Strategic Brand Partner prospect available globally — audience size, geographic reach, and strategic direction alignment are all exceptional. Score reflects that PMI is a large organisation with its own brand priorities, making partnership terms potentially complex to negotiate, and that GIMI must be positioned as complementary rather than competitive.",
    redFlags: [
      "PMI's scale means partnership discussions will involve multiple stakeholders and legal review — initial outreach should target PMI's Strategic Partnerships or Global Alliances team specifically, not general enquiries.",
      "PMI has its own expanding certification portfolio; the partnership framing must clearly differentiate GIMI's ISO 56002+ innovation management standard from PMI's adjacent transformation and agile offerings.",
    ],
    outreachEmail: {
      subject: "Strategic Partnership Proposal — GIMI-IAOIP × PMI: Innovation Management as a Professional Discipline",
      body: `Dear PMI Strategic Alliances Team,

PMI's sustained effort to expand into strategic transformation and innovation management reflects the same conviction that has driven GIMI since 2009 — that innovation is a professional discipline that can be taught, measured, and certified.

GIM Institute (GIMI-IAOIP) is the world's first ISO 56002+ certified global standard body for innovation management, representing the largest professional innovation organisation worldwide following our 2023 merger with IAOIP.

We believe a Strategic Brand Partnership between GIMI and PMI would serve both organisations' members: PMI practitioners gain access to a complementary ISO-backed innovation credential, and GIMI members gain exposure to the world's largest project management community. Potential collaboration modalities include co-branded research, joint event programming, and reciprocal membership benefits.

We would welcome an exploratory conversation at a time that suits your team.

Best regards,
GIMI Partnerships Team
giminstitute.org`,
    },
  },
];
