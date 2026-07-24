import { useState } from 'react';

function App() {
  // Navigation state: 'input', 'loading', 'result', or 'low-confidence'
  const [currentScreen, setCurrentScreen] = useState('input');

  // Helper function to simulate processing delay
  const handleAnalyze = (targetScreen) => {
    setCurrentScreen('loading');
    setTimeout(() => {
      setCurrentScreen(targetScreen);
    }, 2000); // 2-second simulation
  };

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Frontend GUI Demo</h1>
      
      {/* ---------------- 1. INPUT SCREEN ---------------- */}
      {currentScreen === 'input' && (
        <div style={{ border: '2px dashed #ccc', padding: '30px', textAlign: 'center', borderRadius: '8px' }}>
          <h2>1. Input Screen</h2>
          <p>Upload your CSV data below:</p>
          <input type="file" style={{ marginBottom: '20px' }} />
          <br />
          <button 
            onClick={() => handleAnalyze('result')} 
            style={{ padding: '10px 20px', marginRight: '10px', cursor: 'pointer' }}
          >
            Analyze (High Confidence)
          </button>
          <button 
            onClick={() => handleAnalyze('low-confidence')} 
            style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: '#f0ad4e', border: 'none', color: '#fff' }}
          >
            Analyze (Low Confidence)
          </button>
        </div>
      )}

      {/* ---------------- 2. PROCESSING SCREEN ---------------- */}
      {currentScreen === 'loading' && (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <h2>2. Processing Your Data...</h2>
          <p>Please wait, compiling results...</p>
          <div style={{ fontSize: '24px', animation: 'pulse 1s infinite' }}>⏳</div>
        </div>
      )}

      {/* ---------------- 3. RESULT SCREEN ---------------- */}
      {currentScreen === 'result' && (
        <div style={{ border: '1px solid #4CAF50', padding: '20px', borderRadius: '8px' }}>
          <button onClick={() => setCurrentScreen('input')}>&lt; Back</button>
          <h2 style={{ color: '#4CAF50' }}>Data Match Complete</h2>
          <p><strong>Confidence:</strong> 98% (HIGH)</p>
          <p><strong>Validated Data:</strong> 88 entries processed successfully.</p>
          <button style={{ padding: '10px 15px', marginTop: '10px' }}>Export Results</button>
        </div>
      )}

      {/* ---------------- 4. LOW-CONFIDENCE SCREEN ---------------- */}
      {currentScreen === 'low-confidence' && (
        <div style={{ border: '1px solid #d9534f', padding: '20px', borderRadius: '8px', backgroundColor: '#fff5f5' }}>
          <button onClick={() => setCurrentScreen('input')}>&lt; Back</button>
          <h2 style={{ color: '#d9534f' }}>⚠️ Low-Confidence Match (&lt;50%)</h2>
          <p><strong>Confidence Score:</strong> 42%</p>
          <p>Low-probability data found in: Row 14, Row 27...</p>
          <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
            <button style={{ padding: '8px 12px' }}>Review Data</button>
            <button style={{ padding: '8px 12px' }} onClick={() => setCurrentScreen('input')}>Edit Original Input</button>
            <button style={{ padding: '8px 12px', backgroundColor: '#d9534f', color: '#fff', border: 'none' }}>Manual Override</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;