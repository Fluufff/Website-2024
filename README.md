This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started (development)

Install dependencies:

```bash
yarn
```

Copy `.env` to `.env.local` and fill it in (see [`tools/mockoon-fake-api`](tools/mockoon-fake-api/) to set up a local mock API).

Then run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Building

**This Git branch makes a few changes to build the site as a self-contained
static export.**

Check the [`.env`
file](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables).
If changes are needed, a `.env.local` file can be created to override individual
environment variables.

Install dependencies and build the project:

```sh
yarn
yarn build
```

Then, deploy the output of the `out` directory [as a static
site](https://nextjs.org/docs/app/building-your-application/deploying/static-exports#deploying). Recommendations:

- Set up a redirect from `/` to `/en/`, as there is no index page at the root.
- Ensure the server serves `/foo/index.html` for the `/foo/` path.
- Ensure the server redirects unslashed URLs to slashed ones (e.g., `/en` ->
  `/en/`). The URLs should be consistent in the export, so this is not
  absolutely needed for the site to function.

### Dependencies / prerequisites

- Node.js. This can be installed with [`nvm`](https://github.com/nvm-sh/nvm).
  Run `nvm use` in this repository to get the right Node.js version.
- [`yarn` classic](https://classic.yarnpkg.com/)
- [PM2](https://pm2.keymetrics.io/)

Set up a reverse proxy to redirect to `localhost:8001` (note: the precise host
matters, it should match what is given in the `start` command's `-H` parameter
when running the Node.js server.)
