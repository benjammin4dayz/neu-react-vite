const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const resourcePath = path.join(__dirname, 'resources');
const rootPath = path.join(__dirname, '..', 'react-src');

const ignored = ['bin', 'dist', 'node_modules', 'public'];

function updateFiles(baseDir) {
  fs.readdirSync(baseDir, { withFileTypes: true }).forEach((dirent) => {
    if (dirent.isDirectory() && !ignored.includes(dirent.name)) {
      const newBaseDir = path.join(baseDir, dirent.name);
      updateFiles(newBaseDir);
    } else if (dirent.isFile()) {
      const filePath = path.join(baseDir, dirent.name);
      let fileContent = fs.readFileSync(filePath, 'utf8');

      if (dirent.name.match(/\.jsx?$/)) {
        // change file extensions
        const newPath = path.join(
          baseDir,
          dirent.name.replace(/\.jsx?$/, (match) => match.replaceAll('j', 't'))
        );

        // change script imports
        fileContent = fileContent.replace(
          /import\s+.*?['"]([^'"]+)\.jsx?['"]/g,
          (match, group) => match.replace(group, group.replace(/j/g, 't'))
        );

        // insert non-null assertion operator
        if (dirent.name === 'main.jsx') {
          fileContent = fileContent.replace(
            /document\.getElementById\('root'\)/,
            "document.getElementById('root')!"
          );
        }

        console.log(`Renaming ${dirent.name} and updating imports`);
        fs.renameSync(filePath, newPath);
        fs.writeFileSync(newPath, fileContent);
      } else if (dirent.name === 'index.html') {
        // update frontend script src in html entry
        console.log('Updating script tag in', dirent.name);
        fs.writeFileSync(
          filePath,
          fileContent.replace(/src\/main\.jsx/g, 'src/main.tsx')
        );
      } else if (dirent.name === 'package.json') {
        // add typescript dependencies and update npm package scripts
        const pkg = JSON.parse(fileContent);

        pkg.scripts.build = 'tsc && vite build';
        pkg.scripts.lint =
          'eslint src/ --ext ts,tsx --report-unused-disable-directives --max-warnings 0';

        console.log('Updating npm package...');
        fs.writeFileSync(filePath, JSON.stringify(pkg, null, 2));
        execSync(
          'npm install --save-dev @typescript-eslint/eslint-plugin @typescript-eslint/parser typescript',
          { cwd: dirent.path, stdio: 'ignore' }
        );
      }
    }
  });
}

function main(cleanup = false) {
  updateFiles(rootPath);
  fs.cpSync(resourcePath, rootPath, { recursive: true });

  if (cleanup) {
    console.log('Cleaning up TS resources');
    fs.rmSync(__dirname, { recursive: true });
  }

  console.log('\x1b[32m\u2713\x1b[0m Done! Happy coding!');
}

module.exports = main;
