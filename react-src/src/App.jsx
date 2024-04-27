import { useState, useEffect } from 'react';
import { CircularProgress as Loader } from '@mui/material';
import { FileBrowser } from './FileBrowser';
import './App.css';

import * as Neutralino from '@neutralinojs/lib';

const logError = (err) => console.log(err);
const shutdownApp = () => {
  Neutralino.app.exit().catch(logError);
};

function App() {
  const [neutralinoReady, setNeutralinoReady] = useState(false);
  const onReady = () => setNeutralinoReady(true);

  useEffect(() => {
    Neutralino.events.on('ready', onReady).catch(logError);
    Neutralino.events.on('windowClose', shutdownApp);

    return () => {
      Neutralino.events.off('ready', onReady).catch(logError);
      Neutralino.events.off('windowClose', shutdownApp);
    };
  }, []);

  return (
    <div className="App">
      {neutralinoReady ? (
        <FileBrowser className="fileBrowser" />
      ) : (
        <Loader className="loader" />
      )}
    </div>
  );
}

export default App;
