import neutralinojsLogo from './assets/neutralinojs.svg';
import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import './App.css';

import * as Neutralino from '@neutralinojs/lib';

function App() {
  // Check for a global variable which is only defined if init was successful
  //
  const isNeutralinoReady = window?.NL_VERSION ? true : false;

  // Potential workaround if the app hangs when closing the main window.
  // https://github.com/neutralinojs/neutralinojs/issues/1179
  //
  const shutdownApp = () => Neutralino.app.exit();

  return (
    <>
      <div>
        <a href="https://neutralino.js.org" target="_blank">
          <img
            src={neutralinojsLogo}
            className="logo neutralinojs"
            alt="Neutralinojs logo"
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
      <div className="card">
        <div>
          Neutralino.js Status:{' '}
          {isNeutralinoReady ? (
            <span style={{ color: 'green' }}>READY (v{window.NL_VERSION})</span>
          ) : (
            <span style={{ color: 'red' }}>ERROR</span>
          )}
        </div>
        <br />
        {isNeutralinoReady && (
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
