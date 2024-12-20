/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import * as Neutralino from '@neutralinojs/lib';
import { createContext, useContext, useEffect, useRef, useState } from 'react';

const NeutralinoContext = createContext(null);

export const useNeutralinoContext = () => {
  const ctx = useContext(NeutralinoContext);
  if (!ctx) {
    throw new Error(
      'useNeutralinoContext must be used within a NeutralinoProvider'
    );
  }
  return ctx;
};

/** @param {NeutralinoProviderProps} props */
export const NeutralinoProvider = ({
  children,
  failAfterMs = 3000,
  fallback,
  loader,
  unmanaged,
}) => {
  const [ready, setReady] = useState(false);
  const [error, setError] = useState(false);

  const errorTimeout = useRef(null);

  const exit = () => {
    void Neutralino.app.exit();
  };

  useEffect(() => {
    try {
      Neutralino.init();
      //
      // If the state is reloaded while Neutralino is already initialized,
      // the "ready" event won't fire. This should always be accurate because
      // Neutralino's init function either passes or throws an error.
      //
      setReady(true);
    } catch (e) {
      errorTimeout.current = setTimeout(() => {
        setError(true);
        errorTimeout.current = null;
      }, failAfterMs);
      console.warn('Neutralino failed to initialize', e);
    }

    return () => {
      if (errorTimeout.current) {
        clearTimeout(errorTimeout.current);
        errorTimeout.current = null;
      }
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

/** @typedef {import('react').ReactNode} ReactNode */
/**
 * @typedef {Object} NeutralinoProviderProps
 * @property {ReactNode} children
 * @property {number} [failAfterMs] Time in milliseconds before switching from loader to fallback.
 * @property {ReactNode} [fallback] Element to display when Neutralino fails to initialize.
 * @property {ReactNode} [loader] Element to display while Neutralino is initializing.
 * @property {boolean} [unmanaged] Irrespectively render children, allowing for manual state management.
 */
