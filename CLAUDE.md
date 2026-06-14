# friday

One-click personal dev workflow for AI coding agents.

## About This Repo

This is the **friday** tool itself. Run `npx friday init` to install globally.

## Development

```bash
node bin/friday.js     # test CLI locally
npm test               # run tests
```

## Principles

- Keep it simple. If a rule doesn't save time, delete it.
- Every command is independently runnable. Workflow commands may still recommend the next step.
- Spec-first: brainstorm → spec → plan → gen → review → verify → commit.

## Git

- Conventional Commits: `type(scope): subject`
- Never push directly to main.
- Run `npm test` before push.
- One logical change per commit.
