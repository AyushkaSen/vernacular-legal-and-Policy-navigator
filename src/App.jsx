import { useState } from 'react';

// --- DUMMY DATA FOR STATIC SCREENS ---
const DUMMY_RESULT_HIGH = {
  documentName: "Land_Record_RTC_2024.pdf",
  summary: "This document certifies land ownership under Section 4 of the Karnataka Land Revenue Act. No active encumbrances or legal disputes were found.",
  confidenceScore: 94,
  confidenceLevel: "HIGH",
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
  
  // States for interactive voice/photo placeholders
  const [isRecording, setIsRecording] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState('');
  const [selectedFileName, setSelectedFileName] = useState('');

  const handleSimulate = (data) => {
    setActiveData(data);
    setCurrentScreen('loading');
    setTimeout(() => {
      setCurrentScreen('result');
    }, 1500);
  };

  // Handler for voice input button placeholder simulation
  const handleMicClick = () => {
    if (!isRecording) {
      setIsRecording(true);
      setVoiceTranscript("Listening... (Speak your legal query or prompt in your vernacular language)");
      setTimeout(() => {
        setVoiceTranscript("“What are my rights regarding land acquisition notice received yesterday?”");
        setIsRecording(false);
      }, 3000);
    }
  };

  // Handler for file/photo upload
  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setSelectedFileName(e.target.files[0].name);
    }
  };

  const ConfidenceBadge = ({ level, score }) => {
    let bgColor = '#2e7d32'; // Green
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

      {/* ---------------- 1. INPUT FORM SCREEN WITH VOICE & PHOTO UI ---------------- */}
      {currentScreen === 'input' && (
        <div style={{ backgroundColor: '#f8f9fa', padding: '30px', borderRadius: '12px', border: '1px solid #e0e0e0' }}>
          <h2 style={{ marginTop: 0 }}>Document & Query Input</h2>
          <p style={{ color: '#555', fontSize: '0.9rem' }}>Upload files, take a photo scan, or use voice input to query legal policies.</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}>
            
            {/* PHOTO / DOCUMENT FILE UPLOAD BUTTON UI */}
            <div style={{ border: '2px dashed #b0bec5', padding: '20px', borderRadius: '8px', textAlign: 'center', background: '#fff' }}>
              <p style={{ margin: '0 0 10px 0', fontWeight: '600', color: '#37474f' }}>📁 Upload Document or Photo Scan</p>
              <input 
                type="file" 
                id="fileUpload" 
                onChange={handleFileChange} 
                style={{ display: 'none' }} 
              />
              <label 
                htmlFor="fileUpload" 
                style={{ display: 'inline-block', padding: '10px 18px', backgroundColor: '#eef2f5', color: '#333', border: '1px solid #cfd8dc', borderRadius: '6px', cursor: 'pointer', fontWeight: '500' }}
              >
                Choose File / Take Photo
              </label>
              {selectedFileName && (
                <p style={{ margin: '10px 0 0 0', fontSize: '0.85rem', color: '#2e7d32', fontWeight: 'bold' }}>
                  Selected: {selectedFileName}
                </p>
              )}
            </div>

            {/* VOICE INPUT BUTTON UI PLACEHOLDER */}
            <div style={{ padding: '20px', borderRadius: '8px', textAlign: 'center', background: '#e3f2fd', border: '1px solid #bbdefb' }}>
              <p style={{ margin: '0 0 10px 0', fontWeight: '600', color: '#0d47a1' }}>🎙️ Vernacular Voice Input</p>
              <button 
                type="button"
                onClick={handleMicClick}
                style={{ 
                  padding: '12px 24px', 
                  backgroundColor: isRecording ? '#c62828' : '#1976d2', 
                  color: '#fff', 
                  border: 'none', 
                  borderRadius: '30px', 
                  fontWeight: 'bold', 
                  cursor: 'pointer',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                }}
              >
                {isRecording ? '🔴 Listening...' : '🎤 Tap to Speak Query'}
              </button>
              {voiceTranscript && (
                <p style={{ margin: '12px 0 0 0', fontSize: '0.9rem', fontStyle: 'italic', color: '#0d47a1', background: '#fff', padding: '10px', borderRadius: '6px' }}>
                  {voiceTranscript}
                </p>
              )}
            </div>

            {/* TEXT INPUT AREA */}
            <div>
              <label style={{ fontWeight: '600', display: 'block', marginBottom: '8px' }}>
                Or Type Text / Query Directly:
              </label>
              <textarea 
                rows="3" 
                placeholder="Paste legal clauses or type query here..." 
                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', fontFamily: 'inherit', boxSizing: 'border-box' }}
              />
            </div>

            {/* SIMULATION ACTION BUTTONS */}
            <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
              <button 
                onClick={() => handleSimulate(DUMMY_RESULT_HIGH)} 
                style={{ flex: 1, padding: '12px', backgroundColor: '#1a237e', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
              >
                Analyze (High Confidence)
              </button>
              
              <button 
                onClick={() => handleSimulate(DUMMY_RESULT_LOW)} 
                style={{ flex: 1, padding: '12px', backgroundColor: '#d32f2f', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
              >
                Analyze (Low Confidence)
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ---------------- 2. LOADING SCREEN ---------------- */}
      {currentScreen === 'loading' && (
        <div style={{ textAlign: 'center', padding: '60px 20px', backgroundColor: '#f8f9fa', borderRadius: '12px' }}>
          <div style={{ fontSize: '3rem', marginBottom: '10px' }}>📄⚙️</div>
          <h3 style={{ margin: 0, color: '#333' }}>Analyzing Legal Document / Query...</h3>
          <p style={{ color: '#666', marginTop: '5px' }}>Translating vernacular terms and verifying policy clauses.</p>
        </div>
      )}

      {/* ---------------- 3. RESULT CARD SCREEN ---------------- */}
      {currentScreen === 'result' && (
        <div>
          <button 
            onClick={() => setCurrentScreen('input')} 
            style={{ marginBottom: '15px', padding: '6px 12px', background: '#e0e0e0', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            ← Back to Input
          </button>

          <div style={{ border: '1px solid #e0e0e0', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            
            <div style={{ padding: '20px', backgroundColor: '#fafafa', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.2rem' }}>{activeData.documentName}</h3>
                <span style={{ fontSize: '0.85rem', color: '#777' }}>Processed Analysis Output</span>
              </div>
              <ConfidenceBadge level={activeData.confidenceLevel} score={activeData.confidenceScore} />
            </div>

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

              {activeData.confidenceLevel === 'LOW' && (
                <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#ffebee', border: '1px solid #ffcdd2', borderRadius: '6px', color: '#c62828' }}>
                  <strong>⚠️ Warning:</strong> Low confidence match detected. Manual review recommended.
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