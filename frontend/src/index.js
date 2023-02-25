import React from 'react';
import ReactDOM from 'react-dom/client';
import 'antd/dist/reset.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/style.css';
import App from './App';
import AuthProvider from "./context/AuthProvider";
import {SearchProvider} from "./context/search";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <AuthProvider>
          <SearchProvider>
             <App />
          </SearchProvider>
      </AuthProvider>

  </React.StrictMode>
);


