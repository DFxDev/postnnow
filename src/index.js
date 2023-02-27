import React from 'react';
// import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css'
import App from './App'
import ReactDOM from 'react-dom/client';
// ReactDOM.render(
//    <Router>
//     <App />
//    </Router>
//  ,document.getElementById('root'))

ReactDOM.createRoot(document.getElementById('root')).render(  
  <Router>
  <App />
  </Router>
)