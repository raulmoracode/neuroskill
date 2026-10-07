# neuroskill

Same skill. Clearer read.

`neuroskill` rewrites any skill into an ADHD-friendly version. The logic, tools and constraints stay
exactly the same; only the communication changes — shorter, more scannable, no walls of text.

This repo is the **React + Vite** site and the skill definition behind it, scaffolded with
[`@raulmoracode/create`](https://github.com/raulmoracode/raulmoracode-create).

## Install

```bash
npx skills add raulmoracode/neuroskill
```

## Use

```bash
/neuroskill remix this skill /your-skill
```

Both commands live in `src/config/site.ts` (`installCommand` and `usageCommand`) and are what the
landing renders. The skill definition itself is `public/SKILL.md`, served as-is, so the install
command downloads it straight from the deployed site.

## Requirements

- **Node.js 24** — pinned in `.nvmrc` (`nvm use` picks it up automatically)
- **pnpm 12.6.0** — pinned in `package.json` (`packageManager`); never use npm or yarn in this project

## Getting started

```bash
pnpm install
pnpm dev
```

## Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start the development server |
| `pnpm build` | Create a production build (`dist/`) |
| `pnpm check` | Run the formatter and linter check |
| `pnpm format` | Apply formatting |
| `pnpm lint` | Run the linter |
| `pnpm test` | Run the test suite (watch mode) |

## Tech stack

- **React 19.3.0 + Vite 8.3.1 + TypeScript 7.0.2** — exact versions, no `^` or `~`
- **Tailwind CSS 4.3.3** — CSS-first configuration (`@import "tailwindcss"` in `src/index.css`)
- **lucide-react 0.577.0** — icons (`Copy`, `Check`, `Github` in the copy blocks)
- **shadcn** — `components.json` + `cn()` helper (`src/lib/utils.ts`)
- **Biome 2.5.14** — formatter, linter and organize imports
- **Vitest 5.0.2 + Testing Library** — tests run in `jsdom`
- **Husky 9.1.7 + Commitlint** — Git hooks and Conventional Commits
- **VS Code** — Biome set as default formatter, format on save

## shadcn components

No components are preinstalled. Add yours from the private registry:

```bash
pnpm dlx shadcn@4.21.0 add @raulmoracode/<component>
```

They land in `src/components/ui/`. Browse the catalogue at https://registry.raulmoracode.com. After
adding components, normalize their style with Biome (the shadcn CLI uses its own formatting):

```bash
pnpm exec biome check --write .
```

The landing components in `src/components/custom/` are hand-written and not from the registry.

## Git workflow

- `pre-commit` runs `pnpm check` and `pnpm test`
- `commit-msg` runs Commitlint — commits must follow [Conventional Commits](https://www.conventionalcommits.org/):

```text
feat: add user profile
fix: handle invalid input
```

## Styling

`src/index.css` uses a deliberate hybrid strategy:

- **At the top, inside `@layer base`** — the shadcn theme tokens (`--background`, `--foreground`,
  `--primary`, `--radius`, …) plus the landing palette (`--paper`, `--ink`, `--signal`, `--rule`).
  They sit in Tailwind's cascade layer so components added from the registry can still be themed.
- **At the bottom, outside any cascade layer** — the landing styles themselves: `.site-shell`,
  `.site-width`, `.hero`, `.copy-code`, `.copy-button`, `.link-button` and `.site-credit`. Unlayered
  CSS beats any `@layer`, so these always win over Tailwind's base layer.

`biome.json` disables the formatter, linter and assist actions for `src/index.css`, so that file
keeps its hand-written formatting.

## Continuous integration

`.github/workflows/ci.yml` runs on every push and pull request:

- `pnpm install` — dependencies resolve correctly
- `pnpm check` — code is formatted and linted
- `pnpm test` — tests pass
- `pnpm build` — production build succeeds

Deployment is manual: once CI passes, deploy to your preferred hosting provider.

## Site identity

`src/config/site.ts` is the single place to change how this site presents itself:

- `title` — the browser tab title
- `description` — the meta description and the preview text shown when the link is shared; it
  currently holds the landing copy ("A shorter version of any skill. Same logic. Same tools. Fewer
  words.") and is editable in the same way
- `favicon` — the icon in the tab
- `socialImage` and `socialImageAlt` — the image shown when the link is shared
  (`socialImage` accepts either a local path such as `/imagen.png`, served from `public/`,
  or a full URL)
- `installCommand`, `usageCommand`, `githubUrl`, `authorUrl` and `shareUrl` — the copy blocks and
  links the landing renders (`shareUrl` is the deployed landing address)
- `author`, `twitter`, `locale`, `themeColor` and `url` (the canonical URL once deployed)

Empty values are never rendered: no blank meta tag is emitted.

`favicon` also accepts a local path such as `/favicon.svg` in `public/`, or a full URL.

Crawlers cannot resolve relative URLs, so once the site is deployed set `url` and any
local `socialImage` is emitted absolute. The preview image has to be a 1200x630 PNG or
JPG (SVG is ignored by X, WhatsApp and Facebook); put it in `public/` and point
`socialImage` at it.

The `siteHead()` plugin in `vite.config.ts` injects the tags into `index.html` at build time.

Change it there and both follow: nothing has to be edited in `index.html` or `layout.tsx`.

## Project structure

```text
├── index.html            # font preconnects + Archivo stylesheet (head tags are injected)
├── public/
│   └── SKILL.md          # skill definition served for `npx skills add`
├── .github/workflows/    # CI (install, check, test, build)
├── src/
│   ├── main.tsx     # entry point
│   ├── App.tsx      # mounts the landing shell
│   ├── index.css    # Tailwind entry point + landing styles
│   ├── components/
│   │   ├── custom/  # landing components (hero.tsx, copy-block.tsx)
│   │   └── ui/      # registry components land here
│   ├── hooks/       # registry hooks land here
│   ├── lib/         # cn() in utils.ts
│   ├── config/
│   │   ├── index.ts # barrel re-exporting site.ts
│   │   └── site.ts  # site identity and landing commands
│   └── test/        # setup.ts + smoke.test.tsx + landing.test.tsx
├── components.json       # shadcn config (includes the @raulmoracode registry)
├── .husky/               # Git hooks
├── commitlint.config.ts  # commit message validation
├── biome.json            # formatter + linter config
├── vitest.config.ts      # test config
├── .vscode/              # VS Code settings + extensions
├── pnpm-workspace.yaml   # minimumReleaseAge policy + excludes
├── LICENSE               # MIT license
├── CHANGELOG.md          # project changelog
└── AGENTS.md             # guidelines for AI coding agents
```

## Links

- Site: [neuroskill.raulmoracode.com](https://neuroskill.raulmoracode.com)
- [raulmoracode.com](https://raulmoracode.com)
- Repository: [github.com/raulmoracode/neuroskill](https://github.com/raulmoracode/neuroskill)
