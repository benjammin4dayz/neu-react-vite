import { useState, useEffect } from 'react';
import neutralinoLogo from './assets/neutralino.svg';
import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import './App.css';

import * as Neutralino from '@neutralinojs/lib';

const shutdownApp = () => {
  // workaround if the app hangs when closing the main window
  // https://github.com/neutralinojs/neutralinojs/issues/1179
  void Neutralino.app.exit();
};

function App() {
  const [neutralinoReady, setNeutralinoReady] = useState(false);
  const onReady = () => setNeutralinoReady(true);

  useEffect(() => {
    void Neutralino.events.on('ready', onReady);

    return () => {
      void Neutralino.events.off('ready', onReady);
    };
  }, []);

  return (
    <>
      <div>
        <a href="https://neutralino.js.org" target="_blank">
          <img
            src={neutralinoLogo}
            className="logo neutralino"
            alt="Neutralino logo"
          />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
      </div>
      <h1>neu-react-vite</h1>
      <div>
        <div>
          Neutralino.js Status:{' '}
          {neutralinoReady ? (
            <span style={{ color: 'green' }}>READY (v{window.NL_VERSION})</span>
          ) : (
            <span style={{ color: 'red' }}>ERROR</span>
          )}
        </div>
        <br />
        {neutralinoReady && (
          <div>
            <button onClick={shutdownApp}>Shutdown App</button>
          </div>
        )}
      </div>
      <p className="read-the-docs">Click on a logo to learn more</p>
    </>
  );
}

export default App;
