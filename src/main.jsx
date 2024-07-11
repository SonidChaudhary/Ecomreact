import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ProductContextAPI from './context/ProductContext.jsx'
import CartContextAPI from './context/CartContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <CartContextAPI>
     <ProductContextAPI>
      <App />
    </ProductContextAPI>
     </CartContextAPI>
  </React.StrictMode>,
)
