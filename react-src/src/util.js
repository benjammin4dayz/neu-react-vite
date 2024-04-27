import { v4 as uuidv4 } from 'uuid';

/**
 * Platform agnostic seperator for Neutralino paths
 */
const sep = '/';

function chopPath(path, selectedFolder) {
  if (path.match(/^[a-zA-Z]:$/)) {
    // resolve drive root `C:`, `D:`, etc as absolute `/`
    // otherwise 'C:' is seemingly interpreted relative to NL_PATH/NL_CWD
    return `${path}${sep}`;
  } else {
    // jump to the selected folder
    const pathParts = path.split(sep);
    const selectedFolderIndex = pathParts.indexOf(selectedFolder);

    return pathParts
      .slice(
        0,
        selectedFolderIndex === -1 ? pathParts.length : selectedFolderIndex + 1
      )
      .join(sep);
  }
}

function generateFolderChain(path) {
  const folderChain = [];
  const pathParts = path.split(sep);

  for (let i = 0; i < pathParts.length; i++) {
    const folderName = pathParts[i];

    folderChain.push({
      id: uuidv4(),
      name: folderName || sep,
      isDir: true,
      openable: true,
      path: pathParts.slice(0, i + 1).join(sep),
    });
  }

  return folderChain;
}

export { chopPath, generateFolderChain, sep };
