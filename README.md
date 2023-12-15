# Databricks

> Databricks site & Storybook.

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

This project contains the Website & Storybook for the `databricks` project, below you will find the corresponing commands to run each one.

## Installation

### Project Dependencies

- [Node v16](https://nodejs.org/en/)
  - Note: isomorphic-fetch library works in 16, not in 18. We will consider using node-fetch or axios for future node version updates.
- [Yarn](https://yarnpkg.com/)
- [NVM](https://github.com/nvm-sh/nvm) (not required but recommended)

### Install

```bash
# Optional Step. Select the right version of node
nvm use
```

```bash
# Install using yarn
yarn
```

## Usage

### Storybook

```bash
# Run
yarn storybook

# Build
yarn storybook:build

```

### Starters

At the moment in order to decrease the build times we have 11 Gatsby Starters, these can be found in the `starters` directory, each one has its own set of commands.

```bash
# Execute in development mode
yarn [starter]:develop

# Build project
yarn [starter]:build

# Serve project
yarn [starter]:serve

# Clean Gatsby cache
yarn [starter]:clean

```

Replace `[starter]` with the name of the starter that you want to run the command, for example for the `website` starter use `yarn webite:develop`

## Format & linter

### Code

```bash
# Format code
yarn format

# Run eslint
yarn lint

# Run eslint with fix
yarn lint --fix

```

### CSS

```bash
# Run eslint
yarn lint:styles

# Run eslint with fix
yarn lint:styles --fix

```

## Deployment

We have two automated deployments:

- Storybook:
  - This is deployed to Vercel, when you open a PR or push to `main` the automated deploy is fired.
- Starters:
  - These are deployed in `Vercel`, on every PR you need to authorize a build, it deploys automatically when a PR is merged to `main`.

## Microsites (Starters)

### Website

Served at [Vercel](https://com-databricks-www.vercel.app/). It will build landing pages in General.

### Blog Legacy

Serve at [Vercel](https://com-databricks-www-blog-legacy.vercel.app/). It will build the old blog posts entries

### Blog Legacy

Serve at [Vercel](https://com-databricks-www-blog.vercel.app/). It will build the newest blog post pages

### Customers

Serve at [Vercel](https://com-databricks-www-customers.vercel.app/). It will build all the customer pages detail

### Resources

Serve at [Vercel](https://com-databricks-www-resources.vercel.app/). It will build all the resources pages

### Solutions

Serve at [TBD](). It will build all the partner solutions pages detail

### Legal

Serve at [Vercel](https://com-databricks-legal.vercel.app/). It will build all the legal pages detail

### Preview

This started is used to provide a preview of content, used by content producers to preview the content before publish them. Serve at [Vercel](https://com-databricks-www-preview.vercel.app/).

## Cypress tests

### How to get started

- You can write your own tests
  - https://docs.cypress.io/guides/end-to-end-testing/writing-your-first-end-to-end-test
- Or Use the recorder then update the code if needed
  - Download https://chrome.google.com/webstore/detail/cypress-chrome-recorder/fellcphjglholofndfmmjmheedhomgin
  - This video demostrates how the extension works https://www.youtube.com/watch?v=-RJuZrq-wOk

### How to run your tests

```bash
yarn cy:open
```

### New Relic Dashboards

https://one.newrelic.com/dashboards?account=3532566&state=49e6d628-79ac-7022-1689-a6a6b7673f54
