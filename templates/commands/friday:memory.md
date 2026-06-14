---
description: View and manage project memory — remember decisions, preferences, and patterns.
kind: memory-discovery
primary_agent: architect
skill_source: none
requires_skills: []
recommended_next: []
---

# Memory

View and manage project memory. Remember important decisions, preferences, and patterns across sessions.

## Input

$ARGUMENTS

## When to Use

- Start of a new session (load context)
- After making an important decision (save it)
- When you want to remember a pattern
- When you want to review what's been learned

## Memory Types

| Type | Purpose | Example |
|------|---------|---------|
| `decision` | Technical decisions and rationale | "We chose PostgreSQL because..." |
| `preference` | User preferences and conventions | "Always use functional style" |
| `pattern` | Recurring patterns and solutions | "When fixing auth bugs, check..." |
| `context` | Project context and constraints | "This project uses Node 18" |
| `error` | Common errors and fixes | "ERR_TLS_CERT when..." |

## Process

### View Memory

1. **Read** — load memory from `memory/` directory
2. **Display** — show memory organized by type
3. **Summarize** — highlight key patterns and decisions

### Save Memory

1. **Identify** — what should be remembered
2. **Classify** — determine memory type
3. **Write** — save to `memory/<type>-<slug>.md`
4. **Index** — update `memory/INDEX.md`

### Search Memory

1. **Query** — search by keyword or type
2. **Filter** — narrow by date or relevance
3. **Present** — show matching memories

## Memory File Format

```markdown
---
type: decision | preference | pattern | context | error
created: YYYY-MM-DD
updated: YYYY-MM-DD
tags: [tag1, tag2]
confidence: high | medium | low
---

# Memory Title

## What
Description of what was learned.

## Why
Why this is important.

## Evidence
- Observation 1
- Observation 2

## When to Apply
Conditions when this memory is relevant.
```

## Memory Index

`memory/INDEX.md` tracks all memories:

```markdown
# Memory Index

## Decisions
- [database-choice.md](database-choice.md) — PostgreSQL selected for ACID compliance

## Preferences
- [functional-style.md](functional-style.md) — Prefer functional patterns

## Patterns
- [auth-debugging.md](auth-debugging.md) — Common auth bug patterns

## Context
- [node-version.md](node-version.md) — Project uses Node 18

## Errors
- [tls-cert-error.md](tls-cert-error.md) — ERR_TLS_CERT fix
```

## Rules

- One memory per file — keep them atomic
- Include evidence — don't just state facts
- Tag for searchability
- Update confidence as more evidence emerges
- Review and prune outdated memories

## Anti-Patterns

| Rationalization | Rebuttal |
|----------------|----------|
| "I'll remember this" | You won't. Write it down. |
| "This is obvious" | It's obvious now. It won't be in 3 months. |
| "Too many files" | Atomic files are easier to find and update. |
| "I don't need to document this" | Your future self will thank you. |

## Output

Memory files saved to `memory/` directory with updated index.

## Verification

- [ ] Memory type matches the information being stored
- [ ] Evidence or rationale is captured, not just conclusions
- [ ] Index references stay in sync with the stored memory files
- [ ] Outdated or weak-confidence entries are called out clearly

## After

- Continue with your workflow — memories persist across sessions
