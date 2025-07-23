import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { CoinProvider } from './tools/context/CoinContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CoinProvider>
      <App />
    </CoinProvider>
  </StrictMode>,
)
