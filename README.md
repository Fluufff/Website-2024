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

## Running in standalone mode: build then push to server (experimental)

Benefit: we can build the site on a development machine, which spares the server
some heavy lifting.

The dependencies and prerequisites are the same as above.

### Locally: prepare build

**Warning**: Try to keep your git clone clean! In particular, beware of changes in
`.env.local`, and run `yarn` to keep your dependencies up to date.

This step builds the standalone site then uploads the different pieces of the
build [in their right
place](https://nextjs.org/docs/app/api-reference/next-config-js/output) in a
single `rsync` command.

Adjust `user`, `example.org` and `fluufff-server` to match the remote user name,
SSH host, and build directory:

```sh
yarn build-standalone && \
rsync -aviR .next/standalone/./ .next/static public .nvmrc user@example.org:fluufff-server
```

### On the server: run

**Prerequisite**: install sharp

- Ensure the right Node.js version is used: go into the build upload directory,
  and run `nvm use`.
- Create a new directory **outside** of the build upload directory, which we
  will refer to as `$SHARP_DIR`. Run the following:

  ```sh
  cd $SHARP_DIR
  yarn add sharp@0.27.2 --ignore-engines
  ```

  The `--ignore-engines` parameter is needed with Yarn v1 to [install
  sharp](https://sharp.pixelplumbing.com/install) properly.

  The specific version number is [for CPU compatibility
  reasons](https://github.com/vercel/next.js/issues/23518#issuecomment-901404801)

We can now start the server.

In the build upload directory, spin up PM2 with the following command::

```sh
HOSTNAME=localhost PORT=8001 NEXT_SHARP_PATH=$SHARP_DIR/node_modules/sharp pm2 start server.sh
```

(Note that the invocation is different from the `pm2 start yarn` method above.)

## Messages import/export

Once your dependencies are installed using `nvm` and `yarn`, run this to create
a CSV file in the directory cotaining the JSON message files:

```sh
node tools/messages-csv.js export
```

That same CSV can be imported to JSON as follows:

```sh
node tools/messages-csv.js import
```
