import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App'
import { ThemeProvider } from './lib/theme'
import { ToastProvider } from './components/Toast'
import { CartProvider } from './components/Cart'
import { BookingsProvider } from './lib/bookings'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <ToastProvider>
        <CartProvider>
          <BookingsProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </BookingsProvider>
        </CartProvider>
      </ToastProvider>
    </ThemeProvider>
  </StrictMode>,
)