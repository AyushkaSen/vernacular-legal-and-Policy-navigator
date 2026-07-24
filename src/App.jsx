import { useState } from 'react';
import { fetchMockAnalysis } from './api';

function App() {
  const [currentScreen, setCurrentScreen] = useState('input');
  const [analysisResult, setAnalysisResult] = useState(null);
  
  // Toggle State: false = Brief, true = Detailed
  const [isDetailed, setIsDetailed] = useState(false);

  // Voice & File states
  const [isRecording, setIsRecording] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState('');
  const [selectedFileName, setSelectedFileName] = useState('');

  const handleAnalyze = async (sampleType) => {
    setCurrentScreen('loading');
    try {
      const data = await fetchMockAnalysis(sampleType);
      setAnalysisResult(data);
      setCurrentScreen('result');
    } catch (error) {
      alert("Error fetching mock analysis!");
      setCurrentScreen('input');
    }
  };

  const handleMicClick = () => {
    if (!isRecording) {
      setIsRecording(true);
      setVoiceTranscript("Listening... (Speak query in vernacular language)");
      setTimeout(() => {
        setVoiceTranscript("“Is my survey number 104/2A eligible for the new scheme?”");
        setIsRecording(false);
      }, 2500);
    }
  };

  // --- TRAFFIC LIGHT BADGE ---
  const TrafficLightBadge = ({ level, score }) => {
    let config = { color: '#2e7d32', bgColor: '#e8f5e9', borderColor: '#a5d6a7', icon: '🟢', label: 'HIGH CONFIDENCE' };
    if (level === 'MEDIUM') config = { color: '#f57f17', bgColor: '#fffde7', borderColor: '#fff59d', icon: '🟡', label: 'MEDIUM CONFIDENCE' };
    if (level === 'LOW') config = { color: '#c62828', bgColor: '#ffebee', borderColor: '#ef9a9a', icon: '🔴', label: 'LOW CONFIDENCE' };

    return (
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: config.bgColor, color: config.color, border: `1px solid ${config.borderColor}`, padding: '6px 14px', borderRadius: '20px', fontWeight: 'bold', fontSize: '0.85rem' }}>
        <span>{config.icon}</span>
        <span>{config.label} ({score}%)</span>
      </div>
    );
  };

  return (
    <div style={{ maxWidth: '720px', margin: '30px auto', fontFamily: 'Segoe UI, sans-serif', padding: '0 20px', color: '#222' }}>
      
      {/* HEADER */}
      <header style={{ borderBottom: '2px solid #e0e0e0', paddingBottom: '15px', marginBottom: '25px' }}>
        <h1 style={{ margin: 0, fontSize: '1.8rem', color: '#1a237e' }}>
          🏛️ Vernacular Legal & Policy Navigator
        </h1>
        <p style={{ margin: '4px 0 0 0', color: '#666', fontSize: '0.95rem' }}>
          Interactive Summary Switcher & Mock API Integration
        </p>
      </header>

      {/* ---------------- 1. INPUT SCREEN ---------------- */}
      {currentScreen === 'input' && (
        <div style={{ backgroundColor: '#f9f9fb', padding: '25px', borderRadius: '12px', border: '1px solid #e0e0e0' }}>
          <h2 style={{ marginTop: 0, fontSize: '1.3rem' }}>1. Document & Query Input</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '15px' }}>
            
            {/* FILE UPLOAD */}
            <div style={{ border: '2px dashed #b0bec5', padding: '15px', borderRadius: '8px', textAlign: 'center', background: '#fff' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>📁 Upload Legal Document / Photo Scan</span>
              <br />
              <input type="file" id="fileInput" style={{ display: 'none' }} onChange={(e) => e.target.files[0] && setSelectedFileName(e.target.files[0].name)} />
              <label htmlFor="fileInput" style={{ display: 'inline-block', marginTop: '8px', padding: '8px 16px', background: '#e3f2fd', color: '#0d47a1', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '0.85rem' }}>
                Browse File / Camera
              </label>
              {selectedFileName && <p style={{ margin: '5px 0 0 0', fontSize: '0.8rem', color: '#2e7d32' }}>Selected: {selectedFileName}</p>}
            </div>

            {/* VOICE MIC INPUT */}
            <div style={{ padding: '15px', borderRadius: '8px', textAlign: 'center', background: '#f3e5f5', border: '1px solid #e1bee7' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: '600', color: '#4a148c' }}>🎙️ Vernacular Voice Query</span>
              <br />
              <button type="button" onClick={handleMicClick} style={{ marginTop: '8px', padding: '8px 20px', background: isRecording ? '#c62828' : '#7b1fa2', color: '#fff', border: 'none', borderRadius: '20px', fontWeight: 'bold', cursor: 'pointer' }}>
                {isRecording ? '🔴 Listening...' : '🎤 Speak Prompt'}
              </button>
              {voiceTranscript && <p style={{ margin: '8px 0 0 0', fontSize: '0.85rem', fontStyle: 'italic', background: '#fff', padding: '6px', borderRadius: '4px' }}>{voiceTranscript}</p>}
            </div>

            {/* MOCK TRIGGER BUTTONS */}
            <div style={{ marginTop: '10px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#555', display: 'block', marginBottom: '8px' }}>
                Test Mock API Responses:
              </label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={() => handleAnalyze('HIGH')} style={{ flex: 1, padding: '10px', backgroundColor: '#2e7d32', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>🟢 High (92%)</button>
                <button onClick={() => handleAnalyze('MEDIUM')} style={{ flex: 1, padding: '10px', backgroundColor: '#f57f17', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>🟡 Medium (68%)</button>
                <button onClick={() => handleAnalyze('LOW')} style={{ flex: 1, padding: '10px', backgroundColor: '#c62828', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>🔴 Low (38%)</button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ---------------- 2. LOADING STATE ---------------- */}
      {currentScreen === 'loading' && (
        <div style={{ textAlign: 'center', padding: '50px 20px', background: '#f9f9fb', borderRadius: '12px' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>⚙️</div>
          <h3 style={{ margin: 0 }}>Processing Document Summary...</h3>
        </div>
      )}

      {/* ---------------- 3. RESULT SCREEN WITH TOGGLE SWITCH ---------------- */}
      {currentScreen === 'result' && analysisResult && (
        <div>
          <button onClick={() => setCurrentScreen('input')} style={{ marginBottom: '15px', padding: '6px 14px', background: '#e0e0e0', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: '600' }}>
            ← Test Another Query
          </button>

          <div style={{ border: '1px solid #e0e0e0', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
            
            {/* CARD HEADER */}
            <div style={{ padding: '18px 20px', backgroundColor: '#fafafa', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.15rem' }}>{analysisResult.documentName}</h3>
                <span style={{ fontSize: '0.8rem', color: '#777' }}>Analysis Complete</span>
              </div>
              <TrafficLightBadge level={analysisResult.confidenceLevel} score={analysisResult.confidenceScore} />
            </div>

            {/* CARD BODY */}
            <div style={{ padding: '20px' }}>
              
              {/* --- BRIEF / DETAILED TOGGLE SWITCH --- */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <span style={{ fontWeight: 'bold', color: '#1a237e', fontSize: '0.95rem' }}>💡 Plain-Language Summary</span>
                
                <label style={{ display: 'inline-flex', alignItems: 'center', cursor: 'pointer', userSelect: 'none' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: '600', color: !isDetailed ? '#1a237e' : '#777' }}>Brief</span>
                  
                  <input 
                    type="checkbox" 
                    checked={isDetailed} 
                    onChange={(e) => setIsDetailed(e.target.checked)} 
                    style={{ opacity: 0, width: 0, height: 0, margin: 0 }} 
                  />
                  
                  <div style={{
                    position: 'relative',
                    margin: '0 8px',
                    width: '38px',
                    height: '22px',
                    backgroundColor: isDetailed ? '#1a237e' : '#ccc',
                    borderRadius: '20px',
                    transition: 'background-color 0.2s ease'
                  }}>
                    <div style={{
                      position: 'absolute',
                      top: '2px',
                      left: isDetailed ? '18px' : '2px',
                      width: '18px',
                      height: '18px',
                      backgroundColor: '#ffffff',
                      borderRadius: '50%',
                      transition: 'left 0.2s ease',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.3)'
                    }}></div>
                  </div>
                  
                  <span style={{ fontSize: '0.85rem', fontWeight: '600', color: isDetailed ? '#1a237e' : '#777' }}>Detailed</span>
                </label>
              </div>

              {/* DYNAMIC SUMMARY CONTENT BASED ON TOGGLE */}
              <div style={{ padding: '14px 16px', backgroundColor: '#f0f4c3', borderRadius: '8px', borderLeft: '4px solid #9e9d24', marginBottom: '20px' }}>
                <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: '1.5', color: '#263238' }}>
                  {!isDetailed ? analysisResult.briefSummary : analysisResult.detailedSummary}
                </p>
              </div>

              {/* EXTRACTED DETAILS TABLE */}
              <h4 style={{ margin: '0 0 10px 0', color: '#1a237e' }}>Extracted Key Details</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                {analysisResult.keyDetails.map((item, idx) => (
                  <div key={idx} style={{ padding: '10px', background: '#f8f9fa', borderRadius: '6px', border: '1px solid #eee' }}>
                    <span style={{ fontSize: '0.75rem', color: '#777', fontWeight: 'bold', textTransform: 'uppercase' }}>{item.label}</span>
                    <div style={{ fontSize: '0.9rem', fontWeight: '600', marginTop: '2px' }}>{item.value}</div>
                  </div>
                ))}
              </div>

              {/* LOW CONFIDENCE WARNING */}
              {analysisResult.confidenceLevel === 'LOW' && (
                <div style={{ marginTop: '20px', padding: '12px', background: '#ffebee', border: '1px solid #ffcdd2', borderRadius: '6px', color: '#c62828', fontSize: '0.9rem' }}>
                  <strong>⚠️ Notice:</strong> Low confidence score (&lt;50%). Manual review recommended.
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