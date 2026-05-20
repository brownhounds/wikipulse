# wikipulse

Live dashboard of every edit happening across Wikimedia in real time. Built as a reactivity showcase for [Elemix](https://github.com/neuralfog/elemix) — streams the public [Wikimedia recent-changes SSE firehose](https://stream.wikimedia.org/v2/stream/recentchange).

![demo](.readme/demo.gif)

## Stack

- **[Elemix](https://github.com/neuralfog/elemix)** — Web Components + signals framework written by myself
- **[elemix-storybook](https://github.com/neuralfog/elemix-storybook)** — Storybook integration for Elemix components
- Vite 8 (Rolldown + Oxc) · TypeScript · SCSS · Biome · Stylelint · Vitest · Playwright

## Run

```bash
npm install
npm run dev          # vite dev server
npm run build        # production build
npm test             # unit tests (jsdom) + storybook tests (chromium)
npm run storybook    # storybook on :6006
npm run lint         # tsc + biome + stylelint
```

---

Built by [~/gitgood.sh](https://gitgood.sh/)
