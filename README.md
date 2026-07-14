# Demian Reidel — The Threshold

A cinematic personal website built around one governing idea: a system can be physically viable without being globally selected.

## Stack

- Next.js App Router
- React 19 and TypeScript
- Raw WebGL for the persistent generative state field
- Accessible semantic HTML with reduced-motion and no-WebGL fallbacks
- Vercel-ready metadata, sitemap, robots, manifest, and dynamic social image

## Routes

- `/` — identity, current work, career arc, research, record, and contact
- `/research/minimum-viable-scale` — interactive research essay
- `/papers/minimum-viable-scale.pdf` — July 2026 working paper

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

The visual language follows five verbs: accumulate, connect, bifurcate, select, and stabilize. Infrared marks instability and transition cost; cyan marks coherent high-scale activation. The WebGL field responds to pointer position and page state while preserving a complete HTML experience underneath it.
