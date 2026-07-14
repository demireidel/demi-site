# Demian Reidel — The Threshold

A cinematic personal website built around one governing idea: a system can be physically viable without being globally selected.

## Stack

- Next.js App Router
- React 19 and TypeScript
- A persistent raw-WebGL state field
- Accessible semantic HTML with reduced-motion and no-WebGL fallbacks
- Vercel-ready metadata, sitemap, robots, manifest, and dynamic social image

## Routes

- `/` — current work, career arc, research, public record, and contact
- `/research/minimum-viable-scale` — interactive research essay and threshold explorer

## Development

```bash
pnpm install
pnpm dev
```

Validation:

```bash
pnpm typecheck
pnpm lint
pnpm build
```

## Design system

The visual language follows five verbs: accumulate, connect, bifurcate, select, and stabilize. Infrared marks instability and transition cost; cyan marks coherent high-scale activation. The WebGL field responds to pointer position and page state while the complete site remains available as real HTML.
