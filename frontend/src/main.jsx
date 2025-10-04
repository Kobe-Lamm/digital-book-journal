// Dependencies:
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

// Importing context:
import { TokenProvider } from './context/AuthToken.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <BrowserRouter>
        <TokenProvider>
          <App />
        </TokenProvider>
      </BrowserRouter>
  </StrictMode>,
)
