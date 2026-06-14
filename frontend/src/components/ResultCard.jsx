import React, { useState } from 'react';
import ScoreRing  from './ScoreRing.jsx';
import EmailModal from './EmailModal.jsx';

export default function ResultCard({ rec, index }) {
  const [profileExpanded, setProfileExpanded] = useState(false);
  const [showEmail,        setShowEmail]       = useState(false);

  const isResearched = rec.researchStatus === 'RESEARCHED';
  const hasRedFlags  =
    rec.redFlags?.length > 0 &&
    !(rec.redFlags.length === 1 && rec.redFlags[0].toLowerCase().includes('no significant'));

  return (
    <>
      <article
        className="result-card animate-fade-up"
        style={{ animationDelay: `${index * 90}ms` }}
      >
        {/* Gradient top border */}
        <div className="card-accent" />

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <div className="card-header">
          <div style={{ flex: 1, minWidth: 0 }}>

            {/* Index + badges */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap', marginBottom: 6 }}>
              <span className="display fw-800 c-teal" style={{ fontSize: '0.68rem', letterSpacing: '0.07em', textTransform: 'uppercase' }}>
                #{String(index + 1).padStart(2, '0')}
              </span>
              <span className="badge badge-category">{rec.category}</span>
              <span className={`badge ${isResearched ? 'badge-researched' : 'badge-hypothetical'}`}>
                {isResearched
                  ? <><CheckMiniIcon /> Researched</>
                  : <><WarnMiniIcon /> Hypothetical</>
                }
              </span>
            </div>

            {/* Organisation name */}
            <h3 className="display fw-800 c-primary"
              style={{ fontSize: '1.2rem', letterSpacing: '-0.025em', lineHeight: 1.2, marginBottom: 5 }}>
              {rec.organizationName}
            </h3>

            {/* Location */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }} className="t-sm c-muted">
              <PinIcon />
              {rec.countryRegion}
            </div>
          </div>

          {/* Score ring */}
          <div style={{ flexShrink: 0 }}>
            <ScoreRing score={rec.fitScore} size={90} />
          </div>
        </div>

        {/* ── Body ───────────────────────────────────────────────────────── */}
        <div className="card-body">

          {/* Organisation Profile */}
          <section>
            <div className="section-label" style={{ marginBottom: 8 }}>
              <OrgIcon /> Organisation Profile
            </div>
            <p className="t-sm c-secondary" style={{ lineHeight: 1.75,
              display: '-webkit-box',
              WebkitLineClamp: profileExpanded ? 'unset' : 3,
              WebkitBoxOrient: 'vertical',
              overflow: profileExpanded ? 'visible' : 'hidden',
            }}>
              {rec.organizationProfile}
            </p>
            {rec.organizationProfile.length > 220 && (
              <button
                onClick={() => setProfileExpanded((v) => !v)}
                className="t-sm fw-600 c-teal"
                style={{ marginTop: 4, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
              >
                {profileExpanded ? 'Show less ↑' : 'Read more ↓'}
              </button>
            )}
          </section>

          <div className="divider" />

          {/* Why They Fit */}
          <section>
            <div className="section-label" style={{ marginBottom: 0 }}>
              <FitIcon /> Why They Fit GIMI
            </div>
            <ul className="fit-list">
              {rec.whyTheyFit.map((reason, i) => (
                <li key={i} className="fit-item">
                  <span className="fit-check">
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none"
                      stroke="var(--teal-500)" strokeWidth="3.5" strokeLinecap="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </span>
                  <span className="t-sm c-secondary" style={{ lineHeight: 1.65 }}>{reason}</span>
                </li>
              ))}
            </ul>
          </section>

          <div className="divider" />

          {/* Score justification */}
          <section>
            <div className="section-label" style={{ marginBottom: 8 }}>
              <ScoreIcon /> Score Justification
            </div>
            <p className="t-sm c-secondary" style={{ lineHeight: 1.75 }}>
              {rec.fitScoreJustification}
            </p>
          </section>

          {/* Red flags */}
          {hasRedFlags && (
            <>
              <div className="divider" />
              <section>
                <div className="section-label" style={{ marginBottom: 8, color: 'var(--amber-text)' }}>
                  <FlagIcon /> Red Flags
                </div>
                <div className="red-flags-block">
                  {rec.redFlags.map((flag, i) => (
                    <div key={i} className="red-flag-item">
                      <span style={{ flexShrink: 0, marginTop: 1 }}>⚠</span>
                      {flag}
                    </div>
                  ))}
                </div>
              </section>
            </>
          )}
        </div>

        {/* ── Footer ─────────────────────────────────────────────────────── */}
        <div className="card-footer">
          <span className="t-xs c-muted">
            {isResearched ? '✓ Based on public data' : '⚠ Illustrative profile'}
          </span>
          <button
            className="btn-primary"
            style={{ width: 'auto', padding: '9px 20px', fontSize: '0.875rem' }}
            onClick={() => setShowEmail(true)}
          >
            <EmailIcon /> View Outreach Email
          </button>
        </div>
      </article>

      {showEmail && (
        <EmailModal
          email={rec.outreachEmail}
          orgName={rec.organizationName}
          onClose={() => setShowEmail(false)}
        />
      )}
    </>
  );
}

/* ── Icon helpers ────────────────────────────────────────────────────────── */

const iconProps = { width: 13, height: 13, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round' };

function CheckMiniIcon() {
  return <svg {...iconProps}><polyline points="20 6 9 17 4 12"/></svg>;
}
function WarnMiniIcon() {
  return <svg {...iconProps}><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>;
}
function PinIcon() {
  return <svg {...iconProps} width="12" height="12"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>;
}
function OrgIcon() {
  return <svg {...iconProps}><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>;
}
function FitIcon() {
  return <svg {...iconProps}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>;
}
function ScoreIcon() {
  return <svg {...iconProps}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>;
}
function FlagIcon() {
  return <svg {...iconProps} stroke="var(--amber-text)"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>;
}
function EmailIcon() {
  return <svg {...iconProps}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;
}
