import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import  store  from './redux/store.js'
import { Provider } from 'react-redux'
import "./pages/i18n.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
         <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#fff",
            color: "#333",
            borderRadius: "8px",
            padding: "12px",
            fontSize: "14px",
          },
        }}
      />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
