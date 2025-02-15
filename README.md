This is a [Next.js](https://nextjs.org/) project bootstrapped with
[`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started (development)

Install dependencies:

```bash
yarn
```

Then run the development server and open
[http://localhost:3000](http://localhost:3000) in your browser to see the
result.

```bash
yarn dev
```

Environment variables are set in `.env` and `.env.development` (which overrides
the former). If you need to make changes to environment variables, create
`.env.development.local`, which will take priority.

Some APIs may not be working. You can
[use Mockoon](tools/mockoon-fake-api/README.md) as a substitute for the CMS or
registration endpoints. Do not forget to set up `.env.development.local` to
point to those mock endpoints.

### Building

#### Simulate CMS

The static archive is made to be built offline, as I anticipate the CMS won't
stay up for long.

To run the simulated CMS, install [mitmproxy](https://mitmproxy.org/), and in a
dedicated terminal, run

```sh
cd static-support
./serve-replay.sh
```

This will launch a reverse proxy that will replay the responses of
dcm.fluufff.org that are required at build-time. This proxy is already
configured as the CMS server in `.env`.

#### Build

Install dependencies and build the project:

```sh
yarn
yarn build
```

To test the build locally, I use
[simple-http-server](https://github.com/TheWaWaR/simple-http-server):

```sh
simple-http-server -p 3000 -i --cors out
```

#### Deploy

Deploy the output of the `out` directory
[as a static site](https://nextjs.org/docs/app/building-your-application/deploying/static-exports#deploying).
Recommendations:

- Set up a redirect from `/` to `/en/`, as there is no index page at the root.
- Ensure the server serves `/foo/index.html` for any `/foo/` path.
- Ensure the server redirects unslashed URLs to slashed ones (e.g., `/en` ->
  `/en/`). The URLs should be consistent in the export, so this is not
  absolutely needed for the site to function.

## Messages import/export

Once your dependencies are installed using `nvm` and `yarn`, run this to create
a CSV file in the `src/messages/` directory:

```sh
./tools/messages-csv.js export
```

That same CSV can be imported back to the JSON files as follows:

```sh
./tools/messages-csv.js import
```
