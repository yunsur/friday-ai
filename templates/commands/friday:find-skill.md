---
description: Search and discover available skills from skills.sh ecosystem.
kind: memory-discovery
primary_agent: architect
skill_source: skills.sh
requires_skills: []
recommended_next: []
---

# Find Skill

Search and discover external skills from the skills.sh ecosystem and local custom installations.

## Input

$ARGUMENTS

## When to Use

- You need a specific capability but don't know the skill name
- You want to explore what skills are available
- You're looking for skills in a specific domain
- You want to discover community-contributed skills

## Boundary

- **friday commands** are built-in workflow commands, not external skills.
- Use `npx friday --help` to browse built-in friday commands.
- Use this command only for community skills or your own custom additions.

## Process

### Search skills.sh

1. **Query** — search the skills.sh database
   - Use `npx skills search <query>` to find skills
   - Or visit https://skills.sh and search manually

2. **Review** — examine search results
   - Read skill descriptions
   - Check popularity and ratings
   - Review installation instructions

3. **Install** — install discovered skills
   - Use `npx skills add <skill-name>` to install
   - Or follow the skill's manual installation instructions

### Local Search

1. **Scan** — search local skill directories
   - `~/.claude/commands/` — custom global additions
   - `./.claude/commands/` — custom project additions
   - Skip friday built-ins already documented in the friday command catalog

2. **Filter** — match by keyword or category
   - Search in skill names
   - Search in skill descriptions

## Usage Examples

### Search for debugging skills
```bash
npx skills search debug
```

### Search for testing skills
```bash
npx skills search test
```

### Install a discovered skill
```bash
npx skills add skill-name
```

### Browse skills.sh directly
Visit https://skills.sh to browse all available skills.

## Available Skill Sources

| Source | Description | Install Command |
|--------|-------------|-----------------|
| **skills.sh** | Community skill marketplace | `npx skills add <name>` |
| **Custom** | Your own skills | Place in `~/.claude/commands/` |

## Rules

- Search skills.sh first for community skills
- Check skill quality before installing
- Read skill documentation
- Prefer well-maintained skills
- Report issues to skill authors

## Anti-Patterns

| Rationalization | Rebuttal |
|----------------|----------|
| "I'll just implement it myself" | First check if someone already did. Don't reinvent. |
| "There's probably no skill for this" | Maybe. But search anyway. Community skills exist. |
| "I'll skip reading the docs" | No. Read the docs. Understand what the skill does. |

## Verification

- [ ] Search query is relevant
- [ ] Skill description matches needs
- [ ] Skill is well-maintained
- [ ] Installation instructions are clear

## Output

List of matching external skills with descriptions and installation instructions.

## After

- Install the skill with `npx skills add <name>`
- Or visit https://skills.sh for manual browsing
- Run the installed skill with your specific input
