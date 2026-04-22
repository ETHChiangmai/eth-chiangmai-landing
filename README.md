# ETH Chiang Mai

Monorepo for the ETH Chiang Mai websites.

## Prerequisites

- Bun 1.x
- Node.js 20.19+ or 22.12+
- A Cloudflare account with access to the target Pages project

## Install

```bash
bun install
```

## Projects

- `websites/landing`: main landing site
- `websites/placeholder`: placeholder site

## Local Development

Run the landing site:

```bash
bun run landing dev
```

Run the placeholder site:

```bash
bun run placeholder dev
```

## Build

Build the landing site:

```bash
bun run landing build
```

Build the placeholder site:

```bash
bun run placeholder build
```

Production output is written to each site's `dist/` directory.

## Publish To Cloudflare Pages

This repo already includes deploy scripts that build the site and publish `dist/` with Wrangler.

1. Authenticate Wrangler:

```bash
bunx wrangler login
```

2. Make sure the Cloudflare Pages project exists.

Current deploy scripts target the Pages project name `ethcm`.

3. Deploy the landing site:

```bash
bun run landing deploy
```

4. Deploy the placeholder site:

```bash
bun run placeholder deploy
```

If you need a different Cloudflare Pages project name, update the `deploy` script in the relevant workspace `package.json`.

## Manual Cloudflare Deploy

If you want to build first and deploy manually:

```bash
bun run landing build
cd websites/landing
bunx wrangler pages deploy ./dist --project-name ethcm
```

Replace `landing` with `placeholder` to publish the other site.

## License

This repository is closed-source and proprietary. See [LICENSE](/Users/den/Projects/ilchishin/ethcm/LICENSE).
