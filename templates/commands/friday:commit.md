---
description: One-click commit (lint + test + commit).
kind: workflow
primary_agent: developer
skill_source: none
requires_skills: []
recommended_next: []
---

# Commit

Commit current changes with lint and test checks.

## Input

$ARGUMENTS

## When to Use

- You have finished a logical change and want to save it cleanly
- Verification has already passed or can be run quickly now
- You already know the intended conventional commit message

## Process

1. **Check changes** — `git status`, stop if no changes.
2. **Analyze diff** — `git diff --stat` and `git diff --cached --stat` to understand scope.
3. **Smart stage** — stage related files only. If the user provided a message, stage all. If auto-generating, group by logical change.
4. **Run tests**:
   - `package.json` → `npm test`
   - `tests/` → `pytest -q`
   - `Cargo.toml` → `cargo test`
5. **If tests fail** — stop and report.
6. **Generate commit message** (if `$ARGUMENTS` is empty):
   - Analyze `git diff --cached` to determine type and scope.
   - Use the format: `type(scope): subject`
   - Generate body with bulleted list of specific changes.
7. **Commit** — `git commit -m "$ARGUMENTS"`.
8. **Show result** — `git log --oneline -1`.

> **Note:** Lint is not run automatically by default. Run `npm run lint` (or `biome check .`) manually before committing if needed.

## Rules

- Do not commit with failing verification.
- Use one logical change per commit.
- Do not mix unrelated files just because they are already modified.
- Stop and ask if the commit message is ambiguous or empty.

## Format

Conventional Commits: `type(scope): subject`

```
type(scope): subject

* change 1
* change 2
```

- type: feat / fix / docs / style / refactor / test / chore
- scope: optional, derived from changed file paths
- subject: ≤72 chars, imperative mood
- body: bulleted list of specific changes (in Chinese or English based on context)

### Scope Detection

| Changed files | Scope |
|---------------|-------|
| `src/catalog.js`, `src/setup.js` | `core` |
| `templates/commands/*` | `commands` |
| `templates/rules/*` | `rules` |
| `bin/*` | `cli` |
| `package.json` | `deps` |
| `*.md` | `docs` |
| Mixed / unclear | omit scope |

### Message Generation Rules

- **feat**: new file added or new functionality introduced
- **fix**: bug fix, error handling, or correction
- **refactor**: restructure without changing behavior
- **docs**: only markdown or comment changes
- **test**: only test file changes
- **chore**: config, deps, CI, tooling
- **style**: formatting, whitespace, lint fixes

## Verification

- [ ] There are staged or stageable changes to commit
- [ ] Relevant verification commands have passed
- [ ] Commit message follows conventional commit format
- [ ] Commit body lists specific changes
- [ ] Final commit contains only the intended logical change

## Output

A single commit with the requested or auto-generated message and validated scope.

## After

- Continue with the next task or open a PR
- If verification fails, return to `/friday:verify` or the command that produced the change
