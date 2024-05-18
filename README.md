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

### Building for production or staging

We use Docker and GitHub Actions to build for production and staging. The build
is a standalone Next.js build.

Refer to the [`Dockerfile`](Dockerfile) and
[GitHub action workflows](.github/workflows/) for more details.

If you need to test a production build locally, you will first need to create
the file `.env.local` to tweak the environment. You will need to set
`NEXT_PUBLIC_ASSET_PREFIX=""` to avoid pointing to the production CDN to resolve
local assets, which would not work.

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
