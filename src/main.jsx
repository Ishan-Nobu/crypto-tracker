import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import CurrencyContextProvider from './components/CurrencyContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CurrencyContextProvider>
      <App />
    </CurrencyContextProvider>
  </StrictMode>,
)
