const { getUserConfirmation, splash } = require('./cli');
const convert = require('./convert');

async function main() {
  splash();
  if (await getUserConfirmation()) {
    convert();
  } else {
    console.log('Aborted. No files were changed.');
  }
}

main();
