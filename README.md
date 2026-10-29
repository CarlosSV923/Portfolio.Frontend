# Carlos Sesme — Personal Portfolio

A personal portfolio built with Next.js App Router, React, and TypeScript. It showcases my full stack projects, professional experience, education, technologies, and ways to get in touch.

## Features

- Statically rendered Spanish (`/es`) and English (`/en`) pages, each with its own title, description, and `hreflang` links. Visiting `/` redirects to the last language chosen, or to the browser's preferred language.
- Light, dark, and system theme options, with matching browser tab icons.
- Responsive sections for projects, career history, interests, and contact information.
- Tech-Snake and Tech-Space, optional desktop-only games in the technologies and hero sections.
- Portfolio content and interface text stored in two TypeScript files; no backend or environment variables are required to run the site locally.

## Run locally

Install Node.js 24 and pnpm 12.4.1, then run these commands from the repository root:

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). It redirects to `/es` or `/en` and uses the system theme until you choose another option.

To check the production build locally:

```sh
pnpm build
pnpm start
```

Other available commands:

| Command             | Purpose                               |
| ------------------- | ------------------------------------- |
| `pnpm lint`         | Lint the project with ESLint.         |
| `pnpm typecheck`    | Generate route types and check types. |
| `pnpm test`         | Run the unit tests once with Vitest.  |
| `pnpm test:watch`   | Run the unit tests in watch mode.     |
| `pnpm format:check` | Check formatting with Prettier.       |
| `pnpm format`       | Format the project with Prettier.     |

Unit tests live next to the code they cover as `*.test.ts` files. They cover the game logic (`src/components/games/*/logic.ts`), the game keyboard filter, the experience ordering in `src/content/experience.ts`, and language matching in `src/i18n/config.ts`.

## Project structure

- `src/app/[lang]/`: Root layout and page for each language, with metadata and static generation.
- `src/app/theme.css`: Design tokens (colors, radii, fonts) for both themes, exposed to Tailwind.
- `src/app/globals.css`: Tailwind entry point and base styles.
- `src/proxy.ts`: Redirects `/` to a language.
- `src/components/sections/`: One component per page section (hero, about, skills, projects, journey, interests, contact).
- `src/components/layout/`: Header and footer.
- `src/components/hero/`: Hero cards (code card, degree, CV download, spaceship).
- `src/components/ui/`: shadcn/ui components plus the shared `BentoGrid`, `BentoCard`, `Section` and `SectionHeading`.
- `src/components/games/`: The games. Each one keeps its rules in a pure, tested `logic.ts` and its UI in components; `shared/` holds what both use: the game loop (`useAnimationFrame`, `useFixedStep`), keyboard bindings (`useGameKeys`), pausing when the tab is hidden, leaving on small screens, and the `GameDialog` built on shadcn's Dialog.
- `src/content/`: Portfolio content and interface text (`es.ts`, `en.ts`) and their types.
- `src/i18n/`: Supported languages and Accept-Language matching.
- `src/lib/`: Theme store, site URL, and the `cn` class helper.
- `src/constants/`, `src/hooks/` and `src/types/`: Navigation, icons, the theme hook, and shared types.
- `public/images/` and `public/icons/`: Images and icons used by the site.
- `public/files/`: English and Spanish downloadable résumés.

Edit `src/content/es.ts` and `src/content/en.ts` when changing portfolio content or interface text. Each file exposes one object: `ui` contains labels and game instructions; the other fields contain the page content. Spanish is the reference: TypeScript rejects the English file if a key is missing or extra. The contact links open an email client or external profiles; there is no contact form or server-side email service.

Styling uses Tailwind CSS v4 with [shadcn/ui](https://ui.shadcn.com) conventions (`components.json`). Add components with `pnpm dlx shadcn@latest add <component>`; they land in `src/components/ui/`. Check the generated imports afterwards: `cn` must come from `@/lib/utils` (the CLI may also install an unrelated `cn` package; remove it), and any new dependency (such as `class-variance-authority`) must be in `package.json`.

## Continuous integration

GitHub Actions runs `.github/workflows/ci.yml` on every pull request and on pushes to `main` and `develop`. It installs dependencies with the pinned pnpm version, then checks formatting, lint, types, unit tests, and the production build. Vercel deploys independently of this workflow.

## Deployment

The repository is prepared for Vercel with `main` as the production branch. After connecting the GitHub repository to Vercel, other branches such as `develop` can receive preview deployments. Import the repository root with the Next.js preset; `vercel.json` declares the framework, and `package.json` selects Node.js 24.

The project pins pnpm 12.4.1. In Vercel, set `ENABLE_EXPERIMENTAL_COREPACK=1` for both Production and Preview so Corepack uses the version specified in `package.json`. Verify a preview build before publishing to production.

Work is merged into `develop` through pull requests and promoted to production by merging `develop` into `main`. Commit messages follow Conventional Commits.
