import { useCallback, useEffect, useState } from 'react';
import { Snackbar } from '@mui/material';
import { ChonkyActions, FullFileBrowser } from 'chonky';
import { v4 as uuidv4 } from 'uuid';
import { chopPath, generateFolderChain } from './util';
import * as Neutralino from '@neutralinojs/lib';

// Tested on Windows - paths may resolve incorrectly on on other platforms

export const FileBrowser = () => {
  const [cd, setCd] = useState(window.NL_PATH);
  const [files, setFiles] = useState([null]);
  const [folderChain, setFolderChain] = useState([null]);

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleAction = useCallback((data) => {
    if (data.id === ChonkyActions.OpenFiles.id && data.payload.targetFile) {
      if (!data.payload.targetFile.isDir) {
        setSnackbarOpen('This demo can only open directories.');
        return;
      }
      const { path, name } = data.payload.targetFile;
      const newPath = chopPath(path, name);

      newPath && setCd(newPath);
    }
  }, []);

  useEffect(() => {
    const fetchDir = async () => {
      let dirEntries = [];

      try {
        dirEntries = await Neutralino.filesystem.readDirectory(cd);
      } catch (e) {
        setSnackbarOpen(`${e.code}: ${e.message}`);
      }

      const newFiles = dirEntries.map((dirent) => {
        const { entry, path, type } = dirent;

        return {
          id: uuidv4(),
          name: entry,
          path,
          isDir: type === 'DIRECTORY',
        };
      });

      setFiles(newFiles);
      setFolderChain(generateFolderChain(cd));
    };

    fetchDir();
  }, [cd]);

  return (
    <>
      <FullFileBrowser
        files={files}
        folderChain={folderChain}
        onFileAction={handleAction}
      />
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        autoHideDuration={2000}
        message={snackbarOpen}
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
      />
    </>
  );
};
