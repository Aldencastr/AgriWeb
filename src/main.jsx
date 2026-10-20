import React from 'react'
import ReactDOM from 'react-dom/client'

// Minimal test component
function TestApp() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center', fontFamily: 'system-ui' }}>
      <h1 style={{ color: 'green' }}>✅ React funcionando correctamente</h1>
      <p>Si ves esto, React está montando correctamente.</p>
      <p>Timestamp: {new Date().toISOString()}</p>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TestApp />
  </React.StrictMode>
)