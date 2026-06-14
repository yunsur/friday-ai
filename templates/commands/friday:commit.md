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
2. **Stage** — `git add -A`.
3. **Run tests**:
   - `package.json` → `npm test`
   - `tests/` → `pytest -q`
   - `Cargo.toml` → `cargo test`
4. **If tests fail** — stop and report.
5. **Commit** — `git commit -m "$ARGUMENTS"`.
6. **Show result** — `git log --oneline -1`.

## Rules

- Do not commit with failing verification.
- Use one logical change per commit.
- Do not mix unrelated files just because they are already modified.
- Stop and ask if the commit message is ambiguous or empty.

## Format

Conventional Commits: `type(scope): subject`
- type: feat / fix / docs / style / refactor / test / chore
- scope: optional
- subject: ≤72 chars

## Verification

- [ ] There are staged or stageable changes to commit
- [ ] Relevant verification commands have passed
- [ ] Commit message follows conventional commit format
- [ ] Final commit contains only the intended logical change

## Output

A single commit with the requested message and validated scope.

## After

- Continue with the next task or open a PR
- If verification fails, return to `/friday:verify` or the command that produced the change
