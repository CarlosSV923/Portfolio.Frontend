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

| Command             | Purpose                           |
| ------------------- | --------------------------------- |
| `pnpm typecheck`    | Check TypeScript types.           |
| `pnpm format:check` | Check formatting with Prettier.   |
| `pnpm format`       | Format the project with Prettier. |

## Project structure

- `src/app/`: App Router entry point, metadata, and global styles.
- `src/components/`: Page sections, shared UI, and Tech-Snake components.
- `src/constants/`: Navigation, technology icons, and preferences.
- `src/data/en.ts` and `src/data/es.ts`: Portfolio content and interface text for each language.
- `src/hooks/` and `src/types/`: Preference state and shared types.
- `public/images/` and `public/icons/`: Images and icons used by the site.
- `public/files/`: English and Spanish downloadable résumés.

Edit `src/data/en.ts` and `src/data/es.ts` when changing portfolio content or interface text. Each file exposes one object: `ui` contains labels and game instructions; the other fields contain the page content. The contact links open an email client or external profiles; there is no contact form or server-side email service.

## Deployment and releases

The repository is prepared for Vercel with `main` as the production branch. After connecting the GitHub repository to Vercel, other branches such as `develop` can receive preview deployments. Import the repository root with the Next.js preset; `vercel.json` declares the framework, and `package.json` selects Node.js 24.

The project pins pnpm 12.4.1. In Vercel, set `ENABLE_EXPERIMENTAL_COREPACK=1` for both Production and Preview so Corepack uses the version specified in `package.json`. Verify a preview build before publishing to production.

Release Please runs on pushes to `main` and can also be started manually from GitHub Actions. It uses Conventional Commits to propose changes to `package.json` and `CHANGELOG.md` in a pull request. Merging that pull request creates a Git tag and GitHub Release. The package is private and is not published to npm.

Enable **Allow GitHub Actions to create and approve pull requests** under **Settings → Actions → General → Workflow permissions** so Release Please can open release pull requests. The workflow uses the repository's `GITHUB_TOKEN`. If other GitHub Actions workflows need to run automatically on pull requests created by Release Please, use a GitHub App token or a personal access token instead.

Vercel deploys changes merged into `main` independently of the later release tag. Review and merge `develop` into `main` before importing the repository for its first production deployment.
