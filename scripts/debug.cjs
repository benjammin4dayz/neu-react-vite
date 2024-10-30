const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const neuConfig = require('../neutralino.config.json');

const root = path.join(__dirname, '..');

const patchFile = path.join(root, neuConfig.cli.frontendLibrary.patchFile);
const patchFileExists = fs.existsSync(patchFile);
const backupPatchFile = path.join(path.dirname(patchFile), 'index.org.html');
const backupPatchFileExists = fs.existsSync(backupPatchFile);

const restorePatchFile = () => {
  fs.rmSync(patchFile);
  fs.renameSync(backupPatchFile, patchFile);
};

if (process.argv.includes('--postdebug')) {
  if (backupPatchFileExists) restorePatchFile();
} else {
  if (patchFileExists) fs.cpSync(patchFile, backupPatchFile);
  spawn(
    'npx',
    ['@neutralinojs/neu', 'run', '--', '--mode=cloud'],
    //
    // Cloud mode is a convenience to avoid the window popup. The NL_TOKEN is
    // not consumed until the debugger attaches; all other clients are rejected
    //
    {
      cwd: path.join(root),
      stdio: 'inherit',
      shell: true,
    }
  );
}
