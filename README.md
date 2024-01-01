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

## Running (server)

(WIP; this describes deployment in a test environment)

Check the [`.env`
file](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables).
If changes are needed, a `.env.local` file can be created to override individual
environment variables.

Install dependencies and build the project:

```sh
yarn
yarn build
```

Run: (**TODO**: make a PM2 configuration file)

```sh
pm2 start yarn -- start -H localhost -p 8001
```

### Updating

(WIP; still looking for a zero-downtime solution.)

### Dependencies / prerequisites

- Node.js. This can be installed with [`nvm`](https://github.com/nvm-sh/nvm).
  Run `nvm use` in this repository to get the right Node.js version.
- [`yarn` classic](https://classic.yarnpkg.com/)
- [PM2](https://pm2.keymetrics.io/)

Set up a reverse proxy to redirect to `localhost:8001` (note: the precise host
matters, it should match what is given in the `start` command's `-H` parameter
when running the Node.js server.)
