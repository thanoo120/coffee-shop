import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Auth0Provider} from '@auth0/auth0-react'
import {CartProvider} from '../src/context/CartContex.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Auth0Provider domain='dev-onn4o33l2rz2pz2j.us.auth0.com' clientId='K7WY8QA0VYgQGPoad0qBAmr3w56c0cIa' authorizationParams={{redirect_uri:window.location.origin}}>
<CartProvider>
    <App />
    </CartProvider>
    </Auth0Provider>
  </StrictMode>,
)
