import { useState } from 'react';

// --- DUMMY DATA FOR STATIC SCREENS ---
const DUMMY_RESULT_HIGH = {
  documentName: "Land_Record_RTC_2024.pdf",
  summary: "This document certifies land ownership under Section 4 of the Karnataka Land Revenue Act. No active encumbrances or legal disputes were found.",
  confidenceScore: 94,
  confidenceLevel: "HIGH", // 'HIGH', 'MEDIUM', 'LOW'
  keyDetails: [
    { label: "Owner Name", value: "Ramesh Kumar" },
    { label: "Survey Number", value: "104/2A" },
    { label: "Jurisdiction", value: "Tehsildar Office, North Zone" },
    { label: "Status", value: "Verified & Active" },
  ]
};

const DUMMY_RESULT_LOW = {
  documentName: "Handwritten_Claim_Notice.jpg",
  summary: "Low-quality image scan with illegible text in section 3. Multiple ambiguous legal clause matches detected.",
  confidenceScore: 42,
  confidenceLevel: "LOW",
  keyDetails: [
    { label: "Claim Type", value: "Unverified Title Dispute" },
    { label: "Confidence Rating", value: "42% (Below 50% Threshold)" },
    { label: "Flagged Issues", value: "Unclear stamp, missing signatory" }
  ]
};

function App() {
  const [currentScreen, setCurrentScreen] = useState('input');
  const [activeData, setActiveData] = useState(DUMMY_RESULT_HIGH);

  const handleSimulate = (data) => {
    setActiveData(data);
    setCurrentScreen('loading');
    setTimeout(() => {
      setCurrentScreen('result');
    }, 1500);
  };

  // Helper component for Confidence Badge UI
  const ConfidenceBadge = ({ level, score }) => {
    let bgColor = '#2e7d32'; // Green for HIGH
    if (level === 'MEDIUM') bgColor = '#f57c00'; // Orange
    if (level === 'LOW') bgColor = '#c62828'; // Red

    return (
      <span style={{
        backgroundColor: bgColor,
        color: '#ffffff',
        padding: '6px 12px',
        borderRadius: '16px',
        fontSize: '0.85rem',
        fontWeight: 'bold',
        display: 'inline-block'
      }}>
        ● {level} CONFIDENCE ({score}%)
      </span>
    );
  };

  return (
    <div style={{ maxWidth: '700px', margin: '40px auto', fontFamily: 'Segoe UI, sans-serif', padding: '0 20px', color: '#333' }}>
      
      {/* APP HEADER */}
      <header style={{ borderBottom: '2px solid #eee', paddingBottom: '15px', marginBottom: '30px' }}>
        <h1 style={{ margin: 0, fontSize: '1.8rem', color: '#1a237e' }}>
          🏛️ Vernacular Legal & Policy Navigator
        </h1>
        <p style={{ margin: '5px 0 0 0', color: '#666', fontSize: '0.95rem' }}>
          Simplifying complex legal documents and government schemes
        </p>
      </header>

      {/* ---------------- 1. INPUT FORM SCREEN ---------------- */}
      {currentScreen === 'input' && (
        <div style={{ backgroundColor: '#f8f9fa', padding: '30px', borderRadius: '12px', border: '1px solid #e0e0e0' }}>
          <h2 style={{ marginTop: 0 }}>Document Analysis Input</h2>
          <p style={{ color: '#555', fontSize: '0.9rem' }}>Upload a legal document, RTC, or scheme paper to break down terms into plain language.</p>

          <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
            <label style={{ fontWeight: '600' }}>
              Select Vernacular Document:
              <input type="file" style={{ display: 'block', marginTop: '8px', width: '100%', padding: '10px', background: '#fff', border: '1px solid #ccc', borderRadius: '6px' }} />
            </label>

            <label style={{ fontWeight: '600' }}>
              Or Paste Text Directly:
              <textarea 
                rows="4" 
                placeholder="Paste legal clauses or policy text here..." 
                style={{ display: 'block', marginTop: '8px', width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', fontFamily: 'inherit' }}
              />
            </label>

            <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
              <button 
                onClick={() => handleSimulate(DUMMY_RESULT_HIGH)} 
                style={{ flex: 1, padding: '12px', backgroundColor: '#1a237e', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
              >
                Simulate High Confidence Match
              </button>
              
              <button 
                onClick={() => handleSimulate(DUMMY_RESULT_LOW)} 
                style={{ flex: 1, padding: '12px', backgroundColor: '#d32f2f', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
              >
                Simulate Low Confidence Match
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ---------------- 2. LOADING SCREEN ---------------- */}
      {currentScreen === 'loading' && (
        <div style={{ textAlign: 'center', padding: '60px 20px', backgroundColor: '#f8f9fa', borderRadius: '12px' }}>
          <div style={{ fontSize: '3rem', marginBottom: '10px' }}>📄⚙️</div>
          <h3 style={{ margin: 0, color: '#333' }}>Analyzing Legal Document...</h3>
          <p style={{ color: '#666', marginTop: '5px' }}>Translating terms and verifying policy clauses against knowledge base.</p>
        </div>
      )}

      {/* ---------------- 3. RESULT CARD SCREEN (WITH BADGE) ---------------- */}
      {currentScreen === 'result' && (
        <div>
          <button 
            onClick={() => setCurrentScreen('input')} 
            style={{ marginBottom: '15px', padding: '6px 12px', background: '#e0e0e0', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            ← Back to Input
          </button>

          <div style={{ border: '1px solid #e0e0e0', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            
            {/* CARD HEADER */}
            <div style={{ padding: '20px', backgroundColor: '#fafafa', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.2rem' }}>{activeData.documentName}</h3>
                <span style={{ fontSize: '0.85rem', color: '#777' }}>Processed Document Summary</span>
              </div>
              <ConfidenceBadge level={activeData.confidenceLevel} score={activeData.confidenceScore} />
            </div>

            {/* CARD BODY */}
            <div style={{ padding: '20px' }}>
              <p style={{ fontSize: '1rem', lineHeight: '1.5', margin: '0 0 20px 0', padding: '12px', backgroundColor: '#f0f4c3', borderRadius: '6px', borderLeft: '4px solid #afb42b' }}>
                💡 <strong>Plain English Breakdown:</strong> {activeData.summary}
              </p>

              <h4 style={{ margin: '0 0 10px 0', color: '#1a237e' }}>Extracted Key Details</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                {activeData.keyDetails.map((detail, idx) => (
                  <div key={idx} style={{ padding: '10px', border: '1px solid #eee', borderRadius: '6px', backgroundColor: '#fff' }}>
                    <div style={{ fontSize: '0.75rem', color: '#888', textTransform: 'uppercase', fontWeight: 'bold' }}>{detail.label}</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: '500', marginTop: '3px' }}>{detail.value}</div>
                  </div>
                ))}
              </div>

              {/* LOW CONFIDENCE ACTION WARNING */}
              {activeData.confidenceLevel === 'LOW' && (
                <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#ffebee', border: '1px solid #ffcdd2', borderRadius: '6px', color: '#c62828' }}>
                  <strong>⚠️ Warning:</strong> Low confidence match detected. Manual review is recommended before taking legal action based on this summary.
                  <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
                    <button style={{ padding: '6px 12px', background: '#c62828', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Review Raw Text</button>
                    <button style={{ padding: '6px 12px', background: '#fff', border: '1px solid #c62828', color: '#c62828', borderRadius: '4px', cursor: 'pointer' }}>Manual Override</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;