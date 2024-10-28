import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import NeutralinoProvider from './NeutralinoProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NeutralinoProvider>
      <App />
    </NeutralinoProvider>
  </React.StrictMode>
);
