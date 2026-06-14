# friday

One-click personal dev workflow for AI coding agents.

## Principles

- Keep it simple. If a rule doesn't save time, delete it.
- Every command is independently runnable. Workflow commands may still recommend the next step.
- Spec-first: brainstorm → spec → plan → gen → review → verify → commit.

## Global Rules

### Code Style
- Match existing style in the file.
- Prefer functional patterns over classes.
- No unnecessary abstractions — boring code is good code.
- Comments only when logic is non-obvious.

### Git
- Conventional Commits: `type(scope): subject`
- Never push directly to main.
- Run `npm test` (or equivalent) before push.
- One logical change per commit.

### Output
- Be concise. Code-first.
- No over-explanation of obvious steps.
- Show file paths as clickable references.
- When uncertain, say so — don't guess.

## Commands

### Workflow Commands

These commands move work through friday's default flow.

| Command | Purpose |
|---------|---------|
| `/friday:hotfix` | Quick bug fix — skip brainstorm, fix directly |
| `/friday:tweak` | Small change — skip brainstorm, tweak directly |
| `/friday:debug` | Systematic debugging — find and fix root cause |
| `/friday:tdd` | Test-driven development — RED-GREEN-REFACTOR |
| `/friday:simplify` | Code simplification — reduce complexity |
| `/friday:security` | Security review — find and fix vulnerabilities |
| `/friday:memory` | View and manage project memory |
| `/friday:find-skill` | Search and discover available skills |
| `/friday:brainstorm` | Turn rough ideas into structured designs |
| `/friday:spec` | Write structured spec (requirements, constraints, interfaces) |
| `/friday:plan` | Break spec into executable tasks |
| `/friday:gen` | Generate code from spec + plan |
| `/friday:review` | Review code against spec |
| `/friday:verify` | Verify requirement coverage and residual risk |
| `/friday:commit` | One-click commit (lint + test + commit) |

### Knowledge Guides

These commands provide domain guidance and can be used independently:
- `/friday:api`
- `/friday:frontend`
- `/friday:backend`
- `/friday:deploy`

## Agents

| Agent | Role |
|-------|------|
| architect | Produces plan and task list |
| developer | Implements tasks with tests |
| tester | Verifies each task immediately |

## Tools & Integrations

Built-in friday commands, external ECC skills, and community skills are separate layers:
- `/friday:*` = built-in commands shipped by friday
- ECC skills = external integrations used by selected commands
- `find-skill` = discovery path for community/custom skills

### Context7 (MCP)
Real-time open-source library documentation. Avoids outdated API suggestions.
- Use `resolve-library-id` to find a library
- Use `get-library-docs` to fetch current docs
- When: unsure about API usage, version compatibility, or best practices

### Spec-Driven Development
Friday's built-in spec format (Markdown + YAML frontmatter), stored in `specs/`.
- `/friday:brainstorm` → `/friday:spec` → `/friday:plan` → `/friday:gen` → `/friday:review` → `/friday:verify`

### Quick Actions
Use these for common tasks without the full workflow:
- `/friday:hotfix` — Fix bugs quickly
- `/friday:tweak` — Make small changes
- `/friday:debug` — Investigate issues
- `/friday:tdd` — Write tests first
- `/friday:simplify` — Clean up code
- `/friday:security` — Security review
- `/friday:memory` — View and manage project memory
