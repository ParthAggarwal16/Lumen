import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './App.tsx'
import SonnerProvider from "../components/ui/sonner.tsx"
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SonnerProvider />
    <Home />
  </StrictMode>,
)
