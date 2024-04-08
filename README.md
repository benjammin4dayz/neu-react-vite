# <img align="left" alt="neu-icon" height="48" src="react-src/src/assets/neutralinojs.svg" />neu-react-vite<img align="right" alt="react-icon" height="48" src="react-src/src/assets/vite.svg" /><img align="right" alt="react-icon" height="48" src="react-src/src/assets/react.svg" />

A minimal template for building Neutralino.js apps using React and Vite.

## Get Started

### Using `neu` ([neu CLI][neu-cli])

```bash
neu create neu-react-vite --template benjammin4dayz/neu-react-vite
cd neu-react-vite
neu run
```

### Using `git` and `npm` ([scripts][npm-scripts])

```bash
git clone --depth=1 https://github.com/benjammin4dayz/neu-react-vite.git
cd neu-react-vite
npm run setup
npm start
```

## GitHub Actions

Build your app and draft a release on GitHub:

```bash
git tag <tag_name>
git push origin <tag_name>
```

[View workflow][workflow-file]

<!-- Links -->

[neu-cli]: https://neutralino.js.org/docs/cli/neu-cli
[npm-scripts]: ./package.json
[workflow-file]: .github/workflows/create-neutralinojs-app.yml
