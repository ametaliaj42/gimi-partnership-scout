import React from 'react';

const FEATURES = [
  'Scored partner profiles with fit justification',
  'Honest red flag analysis per prospect',
  'Personalised outreach email per organisation',
  'Existing GIMI partners excluded automatically',
];

export default function EmptyState() {
  return (
    <div className="empty-state">

      {/* Icon */}
      <div className="empty-icon-wrap">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none"
          stroke="var(--teal-500)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.35-4.35"/>
          <path d="M11 8v6M8 11h6" strokeWidth="2"/>
        </svg>
      </div>

      {/* Text */}
      <div>
        <h3 className="display fw-700 c-primary"
          style={{ fontSize: '1.25rem', letterSpacing: '-0.02em', marginBottom: 8 }}>
          Ready to Scout
        </h3>
        <p className="t-sm c-secondary" style={{ maxWidth: 340, margin: '0 auto', lineHeight: 1.7 }}>
          Configure your parameters on the left and click{' '}
          <strong style={{ color: 'var(--text-primary)' }}>Scout Partners</strong>{' '}
          to identify high-fit prospects for GIMI's global ecosystem.
        </p>
      </div>

      {/* Feature list */}
      <div className="feature-list">
        {FEATURES.map((f, i) => (
          <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <span style={{
              width: 20, height: 20, borderRadius: '50%',
              background: 'var(--teal-50)', border: '1.5px solid var(--teal-100)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
                stroke="var(--teal-500)" strokeWidth="3" strokeLinecap="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </span>
            <span className="t-sm c-secondary">{f}</span>
          </div>
        ))}
      </div>

    </div>
  );
}
