import React from 'react';
import EmptyState     from './EmptyState.jsx';
import LoadingSkeleton from './LoadingSkeleton.jsx';
import ResultCard      from './ResultCard.jsx';

export default function ResultsPanel({ status, results, error, query, onStatusChange }) {
  if (status === 'idle')    return <EmptyState />;
  if (status === 'loading') return <LoadingSkeleton count={query?.numRecommendations ?? 3} />;
  if (status === 'error')   return <ErrorState message={error} />;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* Results meta row */}
      <div className="results-meta">
        <div>
          <h2 className="display fw-700 c-primary"
            style={{ fontSize: '1.0625rem', letterSpacing: '-0.02em' }}>
            {results.length} {results.length === 1 ? 'Recommendation' : 'Recommendations'}
          </h2>
          {query && (
            <p className="t-sm c-muted" style={{ marginTop: 2 }}>
              {query.partnerType} · {query.region}
              {query.sectorFocus ? ` · ${query.sectorFocus}` : ''}
            </p>
          )}
        </div>

        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          background: 'var(--teal-50)', border: '1px solid var(--teal-100)',
          borderRadius: 'var(--r-full)', padding: '4px 12px',
        }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
            stroke="var(--teal-600)" strokeWidth="3" strokeLinecap="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          <span className="t-xs fw-600" style={{ color: 'var(--teal-700)' }}>
            Existing partners excluded
          </span>
        </div>
      </div>

      {/* Cards */}
      {results.map((rec, i) => (
        <ResultCard key={rec.id ?? i} rec={rec} index={i} onStatusChange={onStatusChange} />
      ))}
    </div>
  );
}

/* ── Error state ─────────────────────────────────────────────────────────── */
function ErrorState({ message }) {
  return (
    <div className="empty-state">
      <div style={{
        width: 64, height: 64, borderRadius: '50%',
        background: 'var(--red-bg)', border: '1px solid #FECACA',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
          stroke="var(--red-500)" strokeWidth="2" strokeLinecap="round">
          <circle cx="12" cy="12" r="10"/>
          <line x1="15" y1="9" x2="9" y2="15"/>
          <line x1="9" y1="9" x2="15" y2="15"/>
        </svg>
      </div>
      <div>
        <h3 className="display fw-700 c-primary" style={{ fontSize: '1.125rem', letterSpacing: '-0.02em', marginBottom: 8 }}>
          Request Failed
        </h3>
        <p className="t-sm c-muted" style={{ maxWidth: 320, lineHeight: 1.7 }}>
          {message ?? 'An unexpected error occurred. Check your connection and try again.'}
        </p>
      </div>
    </div>
  );
}
