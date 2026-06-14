import React from 'react';

export default function Header() {
  return (
    <header className="app-header">

      {/* Left — brand identity + agent label */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div className="header-logo-mark">GI</div>

        <div style={{ marginLeft: 10 }}>
          <div className="display fw-700 c-inverse" style={{ fontSize: '0.9375rem', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            GIMI-IAOIP
          </div>
          <div className="t-xs c-muted" style={{ color: 'rgba(255,255,255,0.42)', lineHeight: 1.2 }}>
            Global Innovation Management Institute
          </div>
        </div>

        <div className="header-sep" />

        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <SearchIcon />
          <span className="display fw-600 c-inverse" style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.88)', letterSpacing: '-0.01em' }}>
            Partnership Scout
          </span>
        </div>
      </div>

      {/* Right — status + attribution */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div className="status-pill">
          <div className="status-dot" />
          <span className="t-xs fw-600" style={{ color: 'var(--teal-400)', letterSpacing: '0.02em' }}>
            Agent Online
          </span>
        </div>
        <span className="t-xs" style={{ color: 'rgba(255,255,255,0.28)', letterSpacing: '0.02em' }}>
          Powered by Claude
        </span>
      </div>

    </header>
  );
}

function SearchIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
      stroke="var(--teal-400)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}
