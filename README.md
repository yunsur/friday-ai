# friday

One-click personal dev workflow for AI coding agents.

## Quick Start

```bash
npx friday init
npx friday init --force
npx friday --help
npx friday --version
```

This installs **globally** to `~/.claude/`:

- **Command catalog** — available in all projects
- **Agent set** — architect, developer, tester
- **Context7 MCP** — real-time library documentation
- **Spec templates** — copied to current project's `specs/`
- **Memory templates** — copied to current project's `memory/`

## Installation

### Option 1: CLI (Recommended)

```bash
npx friday init
npx friday init --force
npx friday --help
npx friday --version
```

- `init` preserves existing files by default.
- `init --force` overwrites friday-managed commands, agents, spec templates, memory templates, and the Context7 entry.
- `--help` shows the installed command catalog and current install behavior.
- `--version` / `-v` prints the CLI version.

### Option 2: Claude Code Plugin

```bash
# Via your published marketplace entry
/plugin marketplace add <owner>/<marketplace-repo>
/plugin install friday

# Or copy manually
cp -r .claude-plugin/ ~/.claude/plugins/friday/
cp -r templates/commands/ ~/.claude/commands/
cp -r templates/agents/ ~/.claude/agents/
```

### Option 3: Codex Plugin

```bash
# Via Codex CLI
codex plugin install friday

# Or copy manually
cp -r .codex-plugin/ ~/.codex/plugins/friday/
```

### Option 4: Manual Install

```bash
cp templates/CLAUDE.md ~/.claude/CLAUDE.md
cp -r templates/commands/ ~/.claude/commands/
cp -r templates/agents/ ~/.claude/agents/
cp -r templates/specs/ ./specs/
cp -r templates/memory/ ./memory/
```

## Commands

### Quick Actions (Standalone)

Use these when you don't need the full workflow:

| Command | What it does |
|---------|-------------|
| `/friday:hotfix` | Quick bug fix — skip brainstorm, fix directly |
| `/friday:tweak` | Small change — skip brainstorm, tweak directly |
| `/friday:debug` | Systematic debugging — find and fix root cause |
| `/friday:tdd` | Test-driven development — RED-GREEN-REFACTOR |
| `/friday:simplify` | Code simplification — reduce complexity |
| `/friday:security` | Security review — find and fix vulnerabilities |

### Memory & Discovery

| Command | What it does |
|---------|-------------|
| `/friday:memory` | View and manage project memory |
| `/friday:find-skill` | Search and discover available skills |

### Knowledge Guides

| Command | What it does |
|---------|-------------|
| `/friday:api` | API design patterns and best practices |
| `/friday:frontend` | Frontend development patterns (React, Next.js) |
| `/friday:backend` | Backend development patterns (APIs, databases) |
| `/friday:deploy` | Deployment workflows and CI/CD patterns |

### Full Workflow

| Command | What it does |
|---------|-------------|
| `/friday:brainstorm` | Turn rough ideas into structured designs |
| `/friday:spec` | Write structured spec (requirements, constraints, interfaces) |
| `/friday:plan` | Break spec into executable tasks |
| `/friday:gen` | Generate code from spec + plan |
| `/friday:review` | Review code against spec |
| `/friday:verify` | Verify requirement coverage and residual risk |
| `/friday:commit` | One-click commit (lint + test + commit) |

## Workflow

### Full Workflow

```
/friday:brainstorm → /friday:spec → /friday:plan → /friday:gen → /friday:review → /friday:verify → /friday:commit
```

Friday commands are independently runnable, but they may recommend the next step in the workflow when that helps you continue.

### Quick Actions

| Scenario | Use |
|----------|-----|
| Fix a bug | `/friday:hotfix` |
| Small text/config change | `/friday:tweak` |
| Investigate an issue | `/friday:debug` |
| Write code with tests | `/friday:tdd` |
| Clean up complex code | `/friday:simplify` |
| Security audit | `/friday:security` |
| Design API | `/friday:api` |
| Build frontend | `/friday:frontend` |
| Build backend | `/friday:backend` |
| Deploy app | `/friday:deploy` |

## Agents

| Agent | Role |
|-------|------|
| architect | Produces plan and task list |
| developer | Implements tasks with tests |
| tester | Verifies each task immediately |

## External Dependencies

### MCP Servers

| Server | Purpose |
|--------|---------|
| **Context7** | Real-time open-source library docs |
| **GitHub** | PR, issue, and repo management |
| **Memory** | Persistent memory across sessions |

### Skills

| Source | Purpose |
|--------|---------|
| **skills.sh** | Search and install community skills |
| **ECC Skills** | High-quality skills from everything-claude-code |

**Boundary:** friday commands are built in. External skills are optional integrations or community add-ons, not the same thing as the `/friday:*` command catalog.

#### ECC Skill Integration

Friday leverages battle-tested skills from the everything-claude-code ecosystem:

| Friday Command | ECC Skill | Purpose |
|----------------|-----------|---------|
| `/friday:tdd` | `tdd-workflow` | Comprehensive TDD with 80%+ coverage |
| `/friday:security` | `security-review` | OWASP Top 10 prevention and best practices |
| `/friday:review` | `code-review` | Five-axis review framework |
| `/friday:api` | `api-design` | REST API design patterns |
| `/friday:frontend` | `frontend-patterns` | React/Next.js patterns |
| `/friday:backend` | `backend-patterns` | API, database, caching patterns |
| `/friday:deploy` | `deployment-patterns` | CI/CD and deployment workflows |

## Spec Format

Friday uses Markdown + YAML frontmatter for specs:

```markdown
---
type: feature
status: draft
created: 2026-06-12
tags: [auth]
---

# Spec: User Login

## Requirements
- Support email + password login
- JWT token issuance

## Constraints
- Password bcrypt encryption
- Token expiry 24h

## Acceptance Criteria
- [ ] Login returns JWT
- [ ] Wrong password returns 401
```

Specs are stored in `specs/` and tracked by git.

## Memory

Friday includes a memory system for persisting decisions, preferences, and patterns across sessions.

See [templates/memory/](templates/memory/) for examples.

## Project Structure

```
friday/
├── bin/
│   ├── friday.js                # CLI entry
│   └── friday.test.js           # CLI tests
├── src/
│   ├── catalog.js               # Shared command/agent catalog
│   ├── setup.js                 # Global installer
│   ├── setup.test.js            # Installer tests
│   ├── metadata.test.js         # Metadata consistency tests
│   └── package-validation.test.js # Packaging boundary tests
├── scripts/
│   ├── sync-metadata.js         # Sync plugin manifests from package.json
│   └── check-package.js         # Validate packed file allow/deny list
├── templates/
│   ├── CLAUDE.md                # → ~/.claude/CLAUDE.md
│   ├── commands/                # → ~/.claude/commands/
│   ├── agents/                  # → ~/.claude/agents/
│   ├── specs/                   # → ./specs/ (per-project)
│   └── memory/                  # → ./memory/ (per-project)
├── .claude-plugin/              # Claude Code plugin config
│   ├── plugin.json
│   └── marketplace.json
├── .codex-plugin/               # Codex plugin manifest
│   └── plugin.json
├── package.json
├── README.md
├── README_zh.md
├── PUBLISHING.md
├── TESTING.md
└── CLAUDE.md
```

## Supported Platforms

| Platform | Config Directory | Install Command |
|----------|------------------|-----------------|
| **Claude Code** | `.claude-plugin/` | `npx friday init` or `/plugin install` |
| **Codex** | `.codex-plugin/` | `codex plugin install friday` |
| **Generic CLI** | `templates/` | `npx friday init` |

## Design Principles

- **One command** — `npx friday init` sets everything up
- **Independently runnable** — commands can be used on their own, while workflows may suggest the next step
- **Spec-first** — brainstorm → spec → plan → gen → review → verify → commit
- **Agent roles** — architect, developer, tester for structured workflow
- **Token-efficient** — only loads what you invoke
- **Multi-platform** — supports Claude Code, Codex, and generic CLI

## Template Layers

Friday ships two kinds of commands:

1. **Workflow commands** — drive work from idea to verification: brainstorm, spec, plan, gen, review, verify, commit.
2. **Knowledge guides** — provide domain-specific guidance you can apply independently: api, frontend, backend, deploy.

## Testing

```bash
npm test               # run all tests
node --test src/*.test.js bin/*.test.js  # run tests directly
```

See [TESTING.md](TESTING.md) for more details.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT
