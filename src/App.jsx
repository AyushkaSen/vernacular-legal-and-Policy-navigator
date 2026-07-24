import React, { useState } from 'react';
import { fetchPolicyResult } from './api';

export default function App() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query) return;
    
    setLoading(true);
    setResult(null);
    
    const data = await fetchPolicyResult(query);
    setResult(data);
    setLoading(false);
  };

  // Helper function for Traffic Light Badge styling
  const getBadgeStyle = (color) => {
    switch (color) {
      case 'GREEN': return { bg: '#d4edda', text: '#155724', dot: '🟢', label: 'High Confidence' };
      case 'YELLOW': return { bg: '#fff3cd', text: '#856404', dot: '🟡', label: 'Medium Confidence' };
      case 'RED': return { bg: '#f8d7da', text: '#721c24', dot: '🔴', label: 'Low Confidence' };
      default: return { bg: '#e2e3e5', text: '#383d41', dot: '⚪', label: 'Unknown' };
    }
  };

  return (
    <div style={{ maxWidth: '420px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>Vernacular Legal & Policy Navigator</h2>
      
      <form onSubmit={handleSubmit}>
        <textarea 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type or ask your legal/policy question here..."
          rows="3"
          style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
        />
        <button 
          type="submit" 
          disabled={loading}
          style={{ width: '100%', marginTop: '10px', padding: '12px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold' }}
        >
          {loading ? 'Analyzing Policy...' : 'Check Eligibility'}
        </button>
      </form>

      {/* Loading Indicator */}
      {loading && <p style={{ textAlign: 'center', marginTop: '20px', color: '#666' }}>⏳ Evaluating guidelines...</p>}

      {/* Result Display */}
      {result && !loading && (
        <div style={{ marginTop: '20px', padding: '16px', borderRadius: '12px', border: '1px solid #e0e0e0', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          
          {/* Traffic Light Indicator */}
          {(() => {
            const badge = getBadgeStyle(result.color);
            return (
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 12px', borderRadius: '20px', backgroundColor: badge.bg, color: badge.text, fontWeight: 'bold', fontSize: '14px' }}>
                <span>{badge.dot}</span>
                <span>{badge.label} ({result.confidence})</span>
              </div>
            );
          })()}

          {/* Explanation Output */}
          <div style={{ marginTop: '14px' }}>
            <strong>Simplified Explanation:</strong>
            <p style={{ marginTop: '6px', lineHeight: '1.5', color: '#333' }}>{result.explanation}</p>
          </div>
        </div>
      )}
    </div>
  );
}