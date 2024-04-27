# Neutralino File Browser

A rudimentary file browser app built using the `neu-react-vite` template.

## About

This **read-only** file browser app uses `Neutralino.filesystem` provided by Neutralino's [Native API](https://neutralino.js.org/docs/api/overview).

It is only granted the `readDirectory` permission, which you can confirm by checking the [`nativeAllowList`][neu-conf].

### Features

- Chonky File Browser - https://chonky.io/
- Directory navigation
- Platform agnostic<sup>[?](#platform-footnote)</sup>

<a name="platform-footnote"></a>
<sup>?</sup> In theory, this app can work on any platform/architecture supported by Neutralino.

### Demo

Here's a preview of the app in action!

![Demo](https://github.com/benjammin4dayz/neu-react-vite/assets/42326027/29c371a2-a3ce-4acd-9e79-26f403161ed1)

## About `neu-react-vite`

This Neutralino app template features HMR _(Hot Module Replacement)_ and uses SWC _(Speedy Web Compiler)_. It can be converted to TypeScript with a <a href="#configuration">single command</a>!

### Demo

Start developing your app in _less than 30 seconds!_

<video src="https://github.com/benjammin4dayz/neu-react-vite/assets/42326027/cdbbc6cd-a485-42dc-b620-1c285bac8f17"></video>

## Getting Started

This template abstracts the setup process by using the [`neu` CLI][neu-cli] under the hood.

### Prerequisites

- Node.js
- npm

### Installation

1. Create a new app with `neu create`

   ```bash
   npx @neutralinojs/neu create myapp --template benjammin4dayz/neu-react-vite
   cd myapp
   ```

<details>
   <summary>Alternative Method (Expand)</summary>

1.  Clone the repo

    ```bash
    git clone --depth=1 https://github.com/benjammin4dayz/neu-react-vite.git
    cd neu-react-vite
    ```

2.  Install dependencies

    ```bash
    npm run setup
    ```

    </details>

### Configuration

- Convert this template to TypeScript

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

Before proceeding, try refreshing the page inside your app with `F5`, `CTRL + R`, or by right-clicking and selecting `Refresh`.

### Blank screen with no errors during development

Try pasting this snippet in the DevTools console tab:

```js
window.location.href = 'http://localhost:3000';
```

<!-- Links -->

[neu-cli]: https://neutralino.js.org/docs/cli/neu-cli
[neu-conf]: ./neutralino.config.json
[npm-scripts]: ./package.json
[workflow-file]: .github/workflows/create-neutralinojs-app.yml
