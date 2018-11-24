## Contributing

Contributions are **welcome** and will be fully **credited**.

We accept contributions via Pull Requests on [Github](https://github.com/radial-color-picker/rotator).

## Quick Links

* [Development Setup](#development-setup)
* [Style Guide](#style-guide)
* [Project Structure](#project-structure)
* [Issues & Pull Requests Guidelines](#issues--pull-requests-guidelines)

## Development Setup

You will need [Node.js](http://nodejs.org/) version 8+ and [Yarn](https://yarnpkg.com/).

After cloning the repo, run:
```sh
$ yarn
```

Then, you can run several commands:
*   `yarn start` builds the sources and starts a Sandbox server where you can test your changes
*   `yarn build` creates a `dist` folder with the production ready sources
*   `yarn lint` checks code style and reformats the code
*   `yarn test` runs the e2e tests once and exits
*   `yarn test:open` runs the e2e tests in Google Chrome in debug mode
*   `yarn ci` runs the e2e tests in Cypress configured to run in a CI environment

It's recommended to run `yarn test` to make sure you don’t introduce any regressions as you work on your change. However it can be handy to try your build of the Rotator in one of the components it supports.

## Style Guide

We use an automatic code formatter called Prettier. Run `yarn lint` after making any changes to the code.

However, there are still some styles that the linter cannot pick up. If you are unsure about something, looking at Airbnb’s Style Guide will guide you in the right direction.

Commit messages should follow the [commit message convention](COMMIT_CONVENTION.md) so that's easier to generate changelogs.

## Project Structure

*   `/src` contains the source code. The codebase is written in ES2015 and the entry point is `/src/main.js`
*   `/sandbox` contains the source code for the Sandbox playground
*   `/dist` contains built files for distribution. Not tracked in the git repository, but will be created every time `yarn build` or `yarn dev` is run.
*   `/cypress` contains all tests. The e2e tests are written and run with Cypress
*   `/.circleci` contains configuration for CircleCI which builds and runs the tests in a CI environment

## Issues & Pull Requests Guidelines

### Issues

GitHub Issues for public bugs. Before filing a new task, try to make sure your problem doesn’t already exist. The best way to get your bug fixed is to provide a reduced test case. A JSBin, Codepen, JSFiddle or Codesandbox is a great starting point.

### Pull Requests

Working on your first Pull Request? You can learn how from this free video series:

[How to Contribute to an Open Source Project on GitHub](https://egghead.io/series/how-to-contribute-to-an-open-source-project-on-github)

To help you get your feet wet and get you familiar with our contribution process, look for GitHub issues with the label "good first issue" which contain bugs that have a relatively limited scope. This is a great place to get started.

If you decide to fix an issue, please be sure to check the comment thread in case somebody is already working on a fix. If nobody is working on it at the moment, please leave a comment stating that you intend to work on it so other people don’t accidentally duplicate your effort.

If somebody claims an issue but doesn’t follow up for more than two weeks, it’s fine to take it over but you should still leave a comment.

*   The master branch is basically just a snapshot of the latest stable release. All development should be done in dedicated branches. Do not submit PRs against the master branch.
*   **Document any change in behavior** - Make sure the `README.md` and any other relevant documentation are kept up-to-date.
*   Checkout a topic branch from the relevant branch, e.g. `master`, and merge back against that branch.
*   **Send coherent history** - Make sure each individual commit in your pull request is meaningful. If you had to make multiple intermediate commits while developing, please [squash them](https://www.git-scm.com/book/en/v2/Git-Tools-Rewriting-History#Changing-Multiple-Commit-Messages) before submitting.
*   Make sure npm test passes. (see [Development Setup](#development-setup))
*   **One pull request per feature** - If you want to do more than one thing, send multiple pull requests.
*   If adding new feature add accompanying test case and a reason to add this feature. Ideally you should open a suggestion issue first and have it greenlighted before working on it.
*   When fixing a bug provide a description of the bug in the PR, live demo preferred. Don't forget to add appropriate tests if applicable

**Happy coding**!
