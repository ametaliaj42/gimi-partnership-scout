import React, { useState } from 'react';

const PARTNER_TYPES = [
  { value: 'Government Association',    icon: '🏛️', label: 'Government' },
  { value: 'Corporate',                 icon: '🏢', label: 'Corporate' },
  { value: 'University',                icon: '🎓', label: 'University' },
  { value: 'Certified Training Partner',icon: '📋', label: 'Training Partner' },
  { value: 'Strategic Brand Partner',   icon: '🤝', label: 'Brand Partner' },
];

export default function ScoutForm({ onSubmit, isLoading }) {
  const [partnerType, setPartnerType]   = useState('');
  const [region, setRegion]             = useState('');
  const [sectorFocus, setSectorFocus]   = useState('');
  const [similarTo, setSimilarTo]       = useState('');
  const [count, setCount]               = useState(3);
  const [errors, setErrors]             = useState({});

  function validate() {
    const e = {};
    if (!partnerType)   e.partnerType = 'Please select a partner type.';
    if (!region.trim()) e.region      = 'Region is required.';
    return e;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    onSubmit({
      partnerType,
      region:       region.trim(),
      sectorFocus:  sectorFocus.trim(),
      similarTo:    similarTo.trim(),
      numRecommendations: count,
    });
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 24, flex: 1 }}>

      {/* Form heading */}
      <div>
        <h2 className="display fw-700 c-primary" style={{ fontSize: '1.25rem', letterSpacing: '-0.02em', marginBottom: 4 }}>
          Find New Partners
        </h2>
        <p className="t-sm c-muted" style={{ lineHeight: 1.6 }}>
          Identify high-fit prospects and generate personalised outreach.
        </p>
      </div>

      <div className="divider" />

      {/* Partner type */}
      <div className="field-group">
        <label className="field-label">
          Partner Type
          <span className="required-star">*</span>
        </label>
        <div className="partner-type-grid">
          {PARTNER_TYPES.map((pt) => {
            const active = partnerType === pt.value;
            return (
              <button
                key={pt.value}
                type="button"
                className={`partner-pill${active ? ' selected' : ''}`}
                onClick={() => { setPartnerType(pt.value); clearError('partnerType'); }}
                aria-pressed={active}
              >
                <span className="pill-icon">{pt.icon}</span>
                <span className="pill-label">{pt.label}</span>
                {active && (
                  <span className="pill-check">
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                )}
              </button>
            );
          })}
        </div>
        {errors.partnerType && <FieldError msg={errors.partnerType} />}
      </div>

      {/* Region */}
      <div className="field-group">
        <label className="field-label" htmlFor="region">
          Target Region <span className="required-star">*</span>
        </label>
        <div className="input-wrapper">
          <span className="input-icon">
            <GlobeIcon />
          </span>
          <input
            id="region"
            type="text"
            className={`text-input${errors.region ? ' has-error' : ''}`}
            placeholder="e.g. Southeast Asia, West Africa…"
            value={region}
            onChange={(e) => { setRegion(e.target.value); clearError('region'); }}
          />
        </div>
        {errors.region && <FieldError msg={errors.region} />}
      </div>

      {/* Sector Focus */}
      <div className="field-group">
        <label className="field-label" htmlFor="sector">
          Sector Focus
          <span className="optional">Optional</span>
        </label>
        <div className="input-wrapper">
          <span className="input-icon"><LayersIcon /></span>
          <input
            id="sector"
            type="text"
            className="text-input"
            placeholder="e.g. Healthcare, Fintech…"
            value={sectorFocus}
            onChange={(e) => setSectorFocus(e.target.value)}
          />
        </div>
      </div>

      {/* Similar To */}
      <div className="field-group">
        <label className="field-label" htmlFor="similar">
          Similar To
          <span className="optional">Optional</span>
        </label>
        <div className="input-wrapper">
          <span className="input-icon"><UsersIcon /></span>
          <input
            id="similar"
            type="text"
            className="text-input"
            placeholder="e.g. Yonsei University, IBM…"
            value={similarTo}
            onChange={(e) => setSimilarTo(e.target.value)}
          />
        </div>
        <p className="field-hint">Name an existing GIMI partner to benchmark against.</p>
      </div>

      {/* Recommendation count */}
      <div className="field-group">
        <label className="field-label">Recommendations</label>
        <div className="count-stepper">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              className={`stepper-btn${count === n ? ' active' : ''}`}
              onClick={() => setCount(n)}
              aria-pressed={count === n}
              aria-label={`${n} recommendation${n > 1 ? 's' : ''}`}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      <div className="divider" />

      {/* Submit */}
      <button type="submit" className="btn-primary" disabled={isLoading}>
        {isLoading ? <><Spinner /> Scouting…</> : <><SearchIconWhite /> Scout Partners</>}
      </button>

      {/* Disclaimer */}
      <p className="t-xs c-muted" style={{ textAlign: 'center', lineHeight: 1.6, marginTop: 'auto' }}>
        Profiles marked <strong style={{ color: 'var(--green-text)' }}>RESEARCHED</strong> are based on publicly available data.
        Existing GIMI partners are excluded automatically.
      </p>
    </form>
  );

  function clearError(key) {
    setErrors((prev) => { const n = { ...prev }; delete n[key]; return n; });
  }
}

/* ── Sub-components ─────────────────────────────────────────────────────── */

function FieldError({ msg }) {
  return (
    <p className="field-error">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
      {msg}
    </p>
  );
}

function Spinner() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
      style={{ animation: 'spin 0.75s linear infinite' }}>
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  );
}

function LayersIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2"/>
      <polyline points="2 17 12 22 22 17"/>
      <polyline points="2 12 12 17 22 12"/>
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  );
}

function SearchIconWhite() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <circle cx="11" cy="11" r="8"/>
      <path d="m21 21-4.35-4.35"/>
    </svg>
  );
}
