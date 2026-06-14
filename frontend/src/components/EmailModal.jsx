import React, { useState, useEffect, useCallback } from 'react';

export default function EmailModal({ email, orgName, onClose }) {
  const [copyState, setCopyState] = useState('idle'); // idle | copied

  // Close on Escape key
  const handleKey = useCallback(
    (e) => { if (e.key === 'Escape') onClose(); },
    [onClose]
  );
  useEffect(() => {
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  function handleCopy() {
    const full = `Subject: ${email.subject}\n\n${email.body}`;
    navigator.clipboard.writeText(full).then(() => {
      setCopyState('copied');
      setTimeout(() => setCopyState('idle'), 2400);
    });
  }

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label={`Outreach email for ${orgName}`}
    >
      <div className="modal-box">

        {/* Header */}
        <div className="modal-header">
          <div>
            <p className="display fw-700 c-inverse" style={{ fontSize: '0.9375rem', letterSpacing: '-0.01em' }}>
              Outreach Email
            </p>
            <p className="t-xs" style={{ color: 'rgba(255,255,255,0.45)', marginTop: 2 }}>
              {orgName}
            </p>
          </div>
          <button
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close email modal"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

          {/* Subject */}
          <div className="email-section">
            <span className="email-section-label">Subject</span>
            <p className="fw-600 c-primary" style={{ fontSize: '0.9375rem' }}>
              {email.subject}
            </p>
          </div>

          {/* Body */}
          <div className="email-section">
            <span className="email-section-label">Body</span>
            <p className="email-body-text">{email.body}</p>
          </div>

        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button className="btn-ghost" onClick={onClose}>
            Close
          </button>
          <button
            className={`btn-copy ${copyState}`}
            onClick={handleCopy}
          >
            {copyState === 'copied' ? (
              <>
                <CheckIcon /> Copied!
              </>
            ) : (
              <>
                <CopyIcon /> Copy Email
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}

function CopyIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  );
}
