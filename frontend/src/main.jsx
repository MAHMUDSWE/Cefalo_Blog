import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './style/tailwind.css'

import axios from 'axios'

axios.interceptors.request.use(req => {
  req.headers.author = "Mahmud";
  req.headers.authorization = `Bearer ${localStorage.getItem("access_token")}`;

  return req;
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
