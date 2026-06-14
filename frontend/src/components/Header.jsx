import React from 'react';
import gimiLogo from '../assets/gimi-logo.png';

export default function Header() {
  return (
    <header className="app-header">

      {/* Left — logo + agent label */}
      <div style={{ display: 'flex', alignItems: 'center' }}>

        {/* Logo in white pill container so it reads cleanly on dark background */}
        <div style={{
          background: '#ffffff',
          borderRadius: 'var(--r-md)',
          padding: '5px 12px',
          display: 'flex',
          alignItems: 'center',
          boxShadow: '0 1px 4px rgba(0,0,0,0.18)',
        }}>
          <img
            src={gimiLogo}
            alt="GIMI Institute — Global Innovation Management Institute"
            style={{
              height: 34,
              width: 'auto',
              display: 'block',
            }}
          />
        </div>

        <div className="header-sep" />

        {/* Agent label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <SearchIcon />
          <span
            className="display fw-600"
            style={{
              fontSize: '0.9375rem',
              color: 'rgba(255,255,255,0.88)',
              letterSpacing: '-0.01em',
            }}
          >
            Partnership Scout
          </span>
        </div>
      </div>

      {/* Right — status + attribution */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div className="status-pill">
          <div className="status-dot" />
          <span
            className="t-xs fw-600"
            style={{ color: 'var(--teal-400)', letterSpacing: '0.02em' }}
          >
            Agent Online
          </span>
        </div>
        <span
          className="t-xs"
          style={{ color: 'rgba(255,255,255,0.28)', letterSpacing: '0.02em' }}
        >
          Powered by Claude
        </span>
      </div>

    </header>
  );
}

function SearchIcon() {
  return (
    <svg
      width="15" height="15" viewBox="0 0 24 24"
      fill="none" stroke="var(--teal-400)"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}
