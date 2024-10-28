import { useState } from 'react';
import './App.css';
import neutralinoLogo from './assets/neutralino.svg';
import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import { useNeutralinoContext } from './NeutralinoProvider';

function App() {
  const { exit } = useNeutralinoContext();

  const [count, setCount] = useState(0);

  return (
    <>
      <aside role="complementary">
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
      </aside>
      <header>
        <h1 style={{ marginTop: '0' }}>neu-react-vite</h1>
      </header>
      <main>
        <p>
          Running Neutralino v{window.NL_VERSION} on {window.NL_OS}{' '}
          {window.NL_ARCH}
        </p>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '0.5rem',
            margin: '2rem 0',
          }}
        >
          <button onClick={() => setCount(count => count + 1)}>
            {count || 'Counter'}
          </button>
          <button onClick={exit}>Shutdown App</button>
        </div>
      </main>
      <footer className="read-the-docs">Click on a logo to learn more</footer>
    </>
  );
}

export default App;
