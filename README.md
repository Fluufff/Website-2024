This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started (development)

Install dependencies:

```bash
yarn
```

Copy `.env` to `.env.development.local` and fill it in (see
[`tools/mockoon-fake-api`](tools/mockoon-fake-api/) to set up a local mock API).

Then run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Building for production

Check the [`.env`
file](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables).
If changes are needed, a `.env.local` file can be created to override individual
environment variables.

Then, build and run with Docker: (docker-compose coming soon)

```sh
docker build -t fluufff-website .
docker run --rm -it -p 3000:3000 fluufff-website
```

### Running the production image locally

I recommend setting `.env.local` to set `ASSET_PREFIX=""` before building the
image, to avoid pointing to the production CDN for assets.

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
