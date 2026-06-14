import React, { useEffect, useState } from 'react';

/*
 * Colour thresholds map a numeric score to a visual tone.
 * The ring draws itself progressively on mount using requestAnimationFrame.
 */
const THRESHOLDS = [
  { min: 8, stroke: 'var(--teal-500)',  textColor: 'var(--teal-700)',  label: 'Excellent' },
  { min: 6, stroke: 'var(--navy-500)',  textColor: 'var(--navy-700)',  label: 'Strong'    },
  { min: 4, stroke: 'var(--amber-500)', textColor: '#92400E',          label: 'Moderate'  },
  { min: 0, stroke: 'var(--red-500)',   textColor: 'var(--red-text)',  label: 'Low'       },
];

function scoreTheme(score) {
  return THRESHOLDS.find((t) => score >= t.min) ?? THRESHOLDS[THRESHOLDS.length - 1];
}

export default function ScoreRing({ score, size = 90 }) {
  const strokeW    = size >= 90 ? 7 : 5;
  const r          = (size - strokeW * 2) / 2;
  const circumference = 2 * Math.PI * r;

  const [progress, setProgress] = useState(0);
  const { stroke, textColor, label } = scoreTheme(score);

  useEffect(() => {
    let raf;
    let current = 0;

    // Brief initial delay lets the card fade-in complete before the ring animates.
    const timer = setTimeout(() => {
      const step = () => {
        current = Math.min(current + score / 28, score);
        setProgress(current);
        if (current < score) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }, 280);

    return () => { clearTimeout(timer); cancelAnimationFrame(raf); };
  }, [score]);

  const offset = circumference * (1 - progress / 10);
  const cx     = size / 2;
  const cy     = size / 2;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
      <svg
        width={size}
        height={size}
        style={{ transform: 'rotate(-90deg)', overflow: 'visible' }}
        aria-label={`Fit score: ${score} out of 10`}
        role="img"
      >
        {/* Track */}
        <circle
          cx={cx} cy={cy} r={r}
          fill="none"
          stroke="var(--surface-subtle)"
          strokeWidth={strokeW}
        />
        {/* Progress arc */}
        <circle
          cx={cx} cy={cy} r={r}
          fill="none"
          stroke={stroke}
          strokeWidth={strokeW}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 35ms linear' }}
        />
        {/* Score label — counter-rotated so it reads upright */}
        <text
          x="50%" y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          style={{
            transform: 'rotate(90deg)',
            transformOrigin: '50% 50%',
            fill: textColor,
            fontFamily: 'var(--font-display)',
          }}
        >
          <tspan style={{ fontWeight: 800, fontSize: size >= 90 ? 22 : 16 }}>{score}</tspan>
          <tspan
            style={{ fontWeight: 500, fontSize: size >= 90 ? 10 : 8, fill: 'var(--text-muted)' }}
          >/10</tspan>
        </text>
      </svg>

      <span style={{
        fontSize: '0.68rem',
        fontWeight: 700,
        color: textColor,
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
      }}>
        {label}
      </span>
    </div>
  );
}
