import React, { useState } from 'react';
import Header       from './components/Header.jsx';
import ScoutForm    from './components/ScoutForm.jsx';
import ResultsPanel from './components/ResultsPanel.jsx';
import { scoutPartners } from './services/scout.js';

/*
 * UI states: idle → loading → success | error
 * All data-fetching goes through the scout service; this component
 * only owns UI state and the transition between views.
 */
export default function App() {
  const [status,    setStatus]    = useState('idle');
  const [results,   setResults]   = useState([]);
  const [error,     setError]     = useState(null);
  const [lastQuery, setLastQuery] = useState(null);
  const [filterUncontacted, setFilterUncontacted] = useState(false);

  async function handleSubmit(formData) {
    setStatus('loading');
    setResults([]);
    setError(null);
    setLastQuery(formData);

    try {
      const data = await scoutPartners(formData);
      setResults(data.recommendations);
      setStatus('success');
    } catch (err) {
      setError(err.message);
      setStatus('error');
    }
  }

  // Filter results based on contact status
  const filteredResults = filterUncontacted
    ? results.filter(r => r.contactStatus === 'uncontacted' || r.contactStatus === 'dismissed')
    : results;

  function handleStatusChange(companyId, newStatus) {
    setResults(results.map(r =>
      r.id === companyId ? { ...r, contactStatus: newStatus } : r
    ));
  }

  return (
    <div className="app-shell">
      <Header />
      <div className="app-body">
        <aside className="sidebar">
          <ScoutForm
            onSubmit={handleSubmit}
            isLoading={status === 'loading'}
            filterUncontacted={filterUncontacted}
            onFilterChange={setFilterUncontacted}
            totalResults={results.length}
            filteredCount={filteredResults.length}
          />
        </aside>
        <main className="main-panel">
          <ResultsPanel
            status={status}
            results={filteredResults}
            error={error}
            query={lastQuery}
            onStatusChange={handleStatusChange}
          />
        </main>
      </div>
    </div>
  );
}
