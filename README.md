# joelcarr.co.uk

My little space on the web to talk about my work.

## Setup

This site is built using [Astro](https://astro.build/) and served from a [Cloudflare Worker](https://developers.cloudflare.com/workers/static-assets/), which requires [node and npm](https://nodejs.org/en/).

Install dependencies:

```bash
npm install
```

Install git hooks:

```bash
npx lefthook install
```

Run site locally:

```bash
npm run dev
```

Build the site into `dist/`:

```bash
npm run build
```

Build and serve it locally with the Workers runtime, as it runs in production:

```bash
npm run preview
```

## Layout

- `src/pages/index.md`: the page content
- `src/layouts/Base.astro`: the HTML wrapper
- `src/styles/site.css`: styles, bundled and minified by Astro
- `wrangler.jsonc`: the Worker, which serves `dist/` as static assets

## Deployment

Workers Builds deploys the Worker `joelcarr-co-uk` from this repo:

- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Preview command (other branches): `npx wrangler preview`
