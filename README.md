# <img align="left" alt="neu-icon" height="48" src="react-src/src/assets/neutralinojs.svg" />neu-react-vite<img align="right" alt="react-icon" height="48" src="react-src/src/assets/vite.svg" /><img align="right" alt="react-icon" height="48" src="react-src/src/assets/react.svg" />

A minimal template for building Neutralino.js apps using React and Vite.

## Getting Started

This template abstracts the setup process by using the [`neu` CLI][neu-cli] under the hood.

### Installation

1. Clone the repo

   ```bash
   git clone --depth=1 https://github.com/benjammin4dayz/neu-react-vite.git
   cd neu-react-vite
   ```

2. Install dependencies

   ```bash
   npm run setup
   ```

3. Convert to TypeScript _(optional)_
   ```bash
   node .ts-convert
   ```

## Usage

- Local Development

  ```bash
  # Develop
  npm start
  # Build
  npm run build
  # Package
  npm run build:release
  ```

  [View scripts][npm-scripts]

- GitHub Actions

  ```bash
  # Build and draft a release on GitHub:
  git tag <tag_name>
  git push origin <tag_name>
  ```

  [View workflow][workflow-file]

## Troubleshooting

### App displays a blank screen with no errors

Try pasting this snippet in the DevTools console tab:

```js
window.location.href = 'http://localhost:3000';
```

<!-- Links -->

[neu-cli]: https://neutralino.js.org/docs/cli/neu-cli
[neutralino-config]: (./neutralino.config.json)
[npm-scripts]: ./package.json
[workflow-file]: .github/workflows/create-neutralinojs-app.yml
