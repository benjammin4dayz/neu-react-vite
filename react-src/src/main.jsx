import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { init as initNeutralino } from '@neutralinojs/lib';

try {
  initNeutralino();
} catch (err) {
  console.warn('Neutralino.js failed to initialize.\n\n', err);
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
