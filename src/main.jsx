import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App.jsx'
import assetUrl from './utils/assetUrl'
import './styles/global.css'

document.documentElement.classList.add('js')
document.documentElement.style.setProperty(
    '--hero-image',
    `url("${assetUrl('/images/alden.jpeg')}")`
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)