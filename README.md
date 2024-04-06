# <img src='react-src/src/assets/neutralinojs.svg' alt='neu-icon' width='24px' height='24px' /> neu-react-vite <img src='react-src/src/assets/react.svg' alt='react-icon' width='24' height='24' />

A minimal template for building Neutralino.js apps using React and Vite.

## Get Started

### Install [neu CLI](https://neutralino.js.org/docs/cli/neu-cli)

    npm i -g @neutralinojs/neu

### Initialize Project

```bash
neu create myapp --template benjammin4dayz/neu-react-vite
cd myapp
```

### Start Developing

    neu run

### Create Neutralino.js App

    neu build

## GitHub Actions

Build your app and draft a release on GitHub:

```bash
git tag <tag_name>
git push origin <tag_name>
```

[View workflow](.github/workflows/create-neutralinojs-app.yml)
