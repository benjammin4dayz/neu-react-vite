/* eslint-disable react-refresh/only-export-components */
import * as Neutralino from '@neutralinojs/lib';
import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useRef, useState } from 'react';

type NeutralinoContextProps = {
  exit: () => unknown;
  ready: boolean;
} | null;

type NeutralinoProviderProps = {
  children: ReactNode;
  /** Time in milliseconds before switching from loader to fallback. */
  failAfterMs?: number;
  /** Element to display when Neutralino fails to initialize. */
  fallback?: ReactNode;
  /** Element to display while Neutralino is initializing. */
  loader?: ReactNode;
  /** Irrespectively render children, allowing for manual state management. */
  unmanaged?: boolean;
};

const NeutralinoContext = createContext<NeutralinoContextProps>(null);

export const useNeutralinoContext = () => {
  const ctx = useContext(NeutralinoContext);
  if (!ctx) {
    throw new Error(
      'useNeutralinoContext must be used within a NeutralinoProvider'
    );
  }
  return ctx;
};

export const NeutralinoProvider = ({
  children,
  failAfterMs = 3000,
  fallback,
  loader,
  unmanaged,
}: NeutralinoProviderProps) => {
  const [ready, setReady] = useState(false);
  const [error, setError] = useState(false);

  const errorTimeout = useRef<NodeJS.Timeout | null>(null);

  const exit = () => {
    void Neutralino.app.exit();
  };

  useEffect(() => {
    try {
      Neutralino.init();
      if (errorTimeout.current) {
        clearTimeout(errorTimeout.current);
        errorTimeout.current = null;
      }
    } catch (e) {
      if (!errorTimeout.current) {
        errorTimeout.current = setTimeout(() => {
          setError(true);
          errorTimeout.current = null;
        }, failAfterMs);
      }
      console.warn('Neutralino failed to initialize', e);
    }

    const onReady = () => {
      setReady(true);
    };
    void Neutralino.events.on('ready', onReady);

    return () => {
      void Neutralino.events.off('ready', onReady);
    };
  }, [failAfterMs]);

  return (
    <NeutralinoContext.Provider value={{ ready, exit }}>
      {unmanaged
        ? children
        : ready
        ? children
        : error
        ? fallback || (
            <button onClick={() => window.location.reload()}>
              Fatal Error! Click to reload.
            </button>
          )
        : loader || <p>Loading...</p>}
    </NeutralinoContext.Provider>
  );
};

export default NeutralinoProvider;
