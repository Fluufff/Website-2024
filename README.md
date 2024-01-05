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

Install dependencies and build the project:

```sh
yarn
yarn build
```

Then, deploy the output of the `out` directory [as a static
site](https://nextjs.org/docs/app/building-your-application/deploying/static-exports#deploying). Recommendations:

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
