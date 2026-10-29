# Carlos Sesme — Personal Portfolio

A personal portfolio built with Next.js App Router, React, and TypeScript. It showcases my full stack projects, professional experience, education, technologies, and ways to get in touch.

## Features

- English and Spanish content, with the selected language saved in the browser.
- Light, dark, and system theme options, with matching browser tab icons.
- Responsive sections for projects, career history, interests, and contact information.
- Tech-Snake, an optional desktop-only game in the technologies section.
- Portfolio content and interface text stored in two TypeScript files; no backend or environment variables are required to run the site locally.

## Run locally

Install Node.js 24 and pnpm 12.4.1, then run these commands from the repository root:

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). The site starts in Spanish and uses the system theme until you choose another option.

To check the production build locally:

```sh
pnpm build
pnpm start
```

Other available commands:

| Command             | Purpose                              |
| ------------------- | ------------------------------------ |
| `pnpm lint`         | Lint the project with ESLint.        |
| `pnpm typecheck`    | Check TypeScript types.              |
| `pnpm test`         | Run the unit tests once with Vitest. |
| `pnpm test:watch`   | Run the unit tests in watch mode.    |
| `pnpm format:check` | Check formatting with Prettier.      |
| `pnpm format`       | Format the project with Prettier.    |

Unit tests live next to the code they cover as `*.test.ts` files. They cover the game logic in `src/components/tech-snake/game.ts` and `src/components/tech-space/game.ts`.

## Project structure

- `src/app/`: App Router entry point, metadata, and global styles.
- `src/components/`: Page sections, shared UI, and Tech-Snake components.
- `src/constants/`: Navigation, technology icons, and preferences.
- `src/data/en.ts` and `src/data/es.ts`: Portfolio content and interface text for each language.
- `src/hooks/` and `src/types/`: Preference state and shared types.
- `public/images/` and `public/icons/`: Images and icons used by the site.
- `public/files/`: English and Spanish downloadable résumés.

Edit `src/data/en.ts` and `src/data/es.ts` when changing portfolio content or interface text. Each file exposes one object: `ui` contains labels and game instructions; the other fields contain the page content. The contact links open an email client or external profiles; there is no contact form or server-side email service.

## Continuous integration

GitHub Actions runs `.github/workflows/ci.yml` on every pull request and on pushes to `main` and `develop`. It installs dependencies with the pinned pnpm version, then checks formatting, lint, types, unit tests, and the production build. Vercel deploys independently of this workflow.

## Deployment

The repository is prepared for Vercel with `main` as the production branch. After connecting the GitHub repository to Vercel, other branches such as `develop` can receive preview deployments. Import the repository root with the Next.js preset; `vercel.json` declares the framework, and `package.json` selects Node.js 24.

The project pins pnpm 12.4.1. In Vercel, set `ENABLE_EXPERIMENTAL_COREPACK=1` for both Production and Preview so Corepack uses the version specified in `package.json`. Verify a preview build before publishing to production.

Work is merged into `develop` through pull requests and promoted to production by merging `develop` into `main`. Commit messages follow Conventional Commits.
