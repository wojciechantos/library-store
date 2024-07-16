# Library Store app by @wojciechantos

This is a simple library app to store the books that you already (or plan to) read. You can add new books with some basic info, mark them as read or unread and remove them.
The app is written in pure TypeScript with OOP methodology, no frameworks were used. The project is powered by Vite bundler to speed up the build and run processes.

You can check the live app hosted via [Netlify](https://www.netlify.com/) here: https://library-store-aweb.netlify.app

or install it on your local machine as described below.

---

### Installation

First, clone this repository with:

`git clone https://github.com/wojciechantos/library-store.git`

Next, run:

`npm install` in your terminal to install necessary dependencies.

And finally, run:

`npm run dev` to start the application.

After a successful start, the app can be accessed in your browser under this URL: `http://localhost:5173/`

To build the application, run:

`npm run build`

Build command runs the following tasks:
 - `eslint` to analyze the code and find eventual lint errors
 - `tsc` to compile the code and find eventual TypeScript errors
 - `vitest --watch=false` to perform unit tests run
 - `vite build` to build the application

---

### Unit tests

Unit testing is handled by the [Vitest](https://vitest.dev/) testing framework. Test run is implemented into the build command as described above, to perform test run automatically.
To run unit tests locally please run:

`npm run test`

If you would like to check test coverage please run:

`npm run test:coverage`

---

### E2E tests

E2E testing is handled by the [Cypress](https://www.cypress.io/) tool. E2E tests are integrated into the CI process and triggered automatically on each push to `main` branch. Tests results can be checked here:

`https://github.com/wojciechantos/library-store/actions`

For a local development you can start the Cypress tool by running:

`npm run cy:open`

If you would like to run tests locally in a CI mode with the Chrome browser, please run:

`npm run e2e:chrome`

---

### Code quality

To provide the best quality code and formatting, the ESLint and Prettier tools are used. I personally recommend installing the official extensions depending on the code editor used.

To run the linter scripts, please run:

`npm run lint`

To run the linter with automatic code fix, you can run:

`npm run lint:fix`

To reformat all files at once with the Prettier configuration, run:

`npm run reformat`

---

### Storage

> [!IMPORTANT]  
> As a temporary solution the books are stored in the browser's local storage. The database will be implemented in the future version as well as authorization.
