# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # dev server (localhost:4321)
npm run build    # production build → dist/
npm run preview  # preview built output
```

## Architecture

**Astro 5 static site** with Tailwind CSS 3, MDX, and View Transitions. No React/Vue — vanilla JS only.

### Pages
- `/` — Homepage: hero, hardware showcase grid, stats counters
- `/lab` — Premium overview with 3 LabPanel cards (Hardware/Software/Architecture)
- `/lineup` — Filter grid (type + status filters)
- `/device/[slug]` — Device product page; flagship layout when `showcase.flagship: true`
- `/software` — Service overview grid
- `/architecture` — Network map + Service accordion map
- `/builds` — Timeline grouped by month
- `/about` — Philosophy
- `/api/devices.json` — Static JSON API

### Content Collections (`src/content/`)
Two collections defined in `src/content/config.ts`:

**`devices`** (type: `content`, MDX files in `src/content/devices/*.mdx`):
- Full Zod schema: `name`, `type`, `status`, `headline`, `role`, `location`, `services[]`, `stack[]`, `outcomes[]`, `decisions`, `specs`, `links`, `photos[]`, `tags[]`, `created`, `updated`
- Optional `showcase` field activates premium features: `flagship`, `bigStatement`, `modules[]`, `features[]`, `serviceStories[]`
- `flagship: true` → full-width layout (BigStatement → ScrollStage → ServiceStoryBlock → ArchitectureViz → FlagshipDecisions → SpecsTable, no sidebar)
- 8 real device files: rpi4, rpi5, qnap-nas, mini-pc, macbook, ipad, iphone, quest

**`software`** (type: `data`, JSON files in `src/content/software/*.json`):
- Schema: `title`, `category`, `summary`, `tags[]`, `runsOn?`, `deviceName?`, `status`
- 15 services: plex, tautulli, n8n, wordpress, portainer, nginx-proxy-manager, home-assistant, uptime-kuma, paperless-ngx, etc.

### Design System

**Colors** — CSS custom properties in `src/styles/global.css` are authoritative at runtime:
- `--color-surface-0..4`: deep navy (#05070f → #1c273d)
- `--color-ink-1..4`: blue-shifted white to muted (#eef0f8 → #2b3248)
- `--color-accent`: #4f8ef7
- `--color-status-{online/offline/maintenance/retired}`

Note: `tailwind.config.mjs` defines different hex values than `global.css` — the CSS vars in `global.css` take runtime precedence for inline styles. Tailwind classes use the config values.

**Component classes** (in `global.css`): `.card`, `.glass`, `.glass-card-glow`, `.btn-primary`, `.btn-secondary`, `.btn-primary-lg`, `.btn-secondary-lg`, `.reveal`, `.stagger-children`, `.section-divider`, `.chip`, `.bg-grid`, `.tilt-card`

**Keyframes**: `hero-word-in`, `drift-slow`, `glow-pulse`, `number-rise`

### Key Components
- `Reveal.astro` — scroll-triggered entrance (16px translateY, 500ms expo-out); `<Reveal delay={N}>` for stagger
- `Layout.astro` — shared shell with navbar + footer + View Transitions
- `DevicePlaceholder.astro` — per-type SVG line-art icons, hard-codes `opacity-[0.22]`; use CSS targeting to override on hover
- `ServiceMap.astro` — sticky filter chips (IntersectionObserver for glass effect) + one-at-a-time accordion
- `NetworkMap.astro` — interactive network diagram; click → device page
- `ScrollStage.astro` — sticky scroll-driven feature reveal (flagship pages)
- `FeatureExplorer.astro` — pill selector + animated stage crossfade
- `ServiceStoryBlock.astro` — 2-col service cards with animated preview components
- `LabPanel.astro` — uses `<style is:global>` for `:has()` sibling dimming across components
- `previews/` — CSS-animated UI mockups: DashboardPreview, TerminalPreview, PlexPreview, BackupPreview, TraefikPreview, FileSyncPreview, ArchivePreview

### Motion & Interaction
- All animations: `src/scripts/motion.ts` — `revealSections`, `staggerChildren`, `animateCounters`, `initFilters`
- `prefers-reduced-motion` respected everywhere
- View Transitions: 280ms, `ease-smooth`; named transitions: `view-transition-name: device-media-{slug}` / `device-name-{slug}`
- Sticky bars sit at `top: 56px` (matches navbar `top-14`)

## Important Gotchas

- **JSX expression collision**: `{{.Something}}` in Astro templates is parsed as a JSX expression — wrap in `{'{{.Something}}'}`
- **TypeScript generics in JSX**: `Record<string, string>` inside template causes parse errors — keep in frontmatter only
- **Two style attrs**: Never put two `style=` attributes on the same element in Astro — combine into one string
- **Status classes**: Use Tailwind classes (`text-status-online`) not CSS vars in `class:list`
- **UI language**: Fully German. Keep product names (Docker, Plex, Traefik, etc.) in English. Key terms: Self-hosted→Selbst gehostet, Architecture→Architektur, Service Map→Dienstübersicht
