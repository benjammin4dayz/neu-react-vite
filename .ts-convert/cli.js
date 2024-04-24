const readline = require('readline');
const process = require('node:process');

const splash = () => {
  console.log(
    [
      '',
      '🚀 Neu-React-Vite (TypeScript) 🚀',
      '----------------------------------------',
      'This script will convert the neu-react-vite template to TypeScript.',
      '',
      '\x1b[33m\u26A0  Use with caution on existing projects.\x1b[0m',
      '----------------------------------------',
    ].join('\n')
  );
};

const getUserConfirmation = () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.on('line', (line) => {
      line === 'y' ? resolve(true) : resolve(false);
      rl.close();
    });

    rl.setPrompt('To proceed, enter "y" (for yes)\n  > ');

    rl.prompt();
  });
};

module.exports = { getUserConfirmation, splash };
