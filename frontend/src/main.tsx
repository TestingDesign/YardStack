import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error("Failed to find the root element. Ensure there is an element with id='root' in your HTML.")
}

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter basename="/YardStack">
      <App />
    </BrowserRouter>
  </StrictMode>
)