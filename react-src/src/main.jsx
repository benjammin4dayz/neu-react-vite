import { setChonkyDefaults, ChonkyActions } from 'chonky';
import { ChonkyIconFA } from 'chonky-icon-fontawesome';
import * as Neutralino from '@neutralinojs/lib';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

try {
  Neutralino.init();
} catch (err) {
  console.warn('Neutralino.js failed to initialize.\n\n', err);
}

setChonkyDefaults({
  iconComponent: ChonkyIconFA,
  disableDragAndDrop: true,
  disableDragAndDropProvider: true,
  disableDefaultFileActions: [
    ChonkyActions.StartDragNDrop.id,
    ChonkyActions.EndDragNDrop.id,
    // TODO: add date/size attr
    ChonkyActions.SortFilesByDate.id,
    ChonkyActions.SortFilesBySize.id,
    //
    ChonkyActions.ToggleHiddenFiles.id,
    ChonkyActions.OpenSelection.id,
    ChonkyActions.SelectAllFiles.id,
    ChonkyActions.ClearSelection.id,
  ],
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
