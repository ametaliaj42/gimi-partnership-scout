import React from 'react';

export default function LoadingSkeleton({ count = 3 }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* Results meta row */}
      <div className="results-meta">
        <div className="skeleton" style={{ height: 20, width: 220 }} />
        <div className="skeleton" style={{ height: 20, width: 160 }} />
      </div>

      {/* Skeleton cards */}
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="result-card" style={{ pointerEvents: 'none' }}>
      <div className="card-accent" style={{ background: 'var(--surface-subtle)' }} />

      {/* Header */}
      <div className="card-header">
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'flex', gap: 6 }}>
            <div className="skeleton" style={{ height: 18, width: 50, borderRadius: 999 }} />
            <div className="skeleton" style={{ height: 18, width: 80, borderRadius: 999 }} />
            <div className="skeleton" style={{ height: 18, width: 90, borderRadius: 999 }} />
          </div>
          <div className="skeleton" style={{ height: 26, width: 240 }} />
          <div className="skeleton" style={{ height: 14, width: 130 }} />
        </div>
        <div className="skeleton" style={{ width: 90, height: 90, borderRadius: '50%', flexShrink: 0 }} />
      </div>

      {/* Body */}
      <div className="card-body">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div className="skeleton" style={{ height: 13, width: 110 }} />
          <div className="skeleton" style={{ height: 13, width: '95%' }} />
          <div className="skeleton" style={{ height: 13, width: '88%' }} />
          <div className="skeleton" style={{ height: 13, width: '82%' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div className="skeleton" style={{ height: 13, width: 100 }} />
          {[85, 92, 78].map((w, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <div className="skeleton" style={{ width: 18, height: 18, borderRadius: '50%', flexShrink: 0 }} />
              <div className="skeleton" style={{ height: 13, width: `${w}%` }} />
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="card-footer">
        <div className="skeleton" style={{ height: 14, width: 160 }} />
        <div className="skeleton" style={{ height: 36, width: 160, borderRadius: 10 }} />
      </div>
    </div>
  );
}
