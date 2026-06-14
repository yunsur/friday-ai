---
description: Write a structured spec from requirements, constraints, and interfaces.
kind: workflow
primary_agent: architect
skill_source: none
requires_skills: []
recommended_next: [friday:plan]
---

# Spec

Create a structured specification document from a description or brainstorm brief.

## Input

$ARGUMENTS

## When to Use

- Starting a new project or feature
- Requirements are ambiguous or incomplete
- The change touches multiple files or modules
- You're about to make an architectural decision
- The task would take more than 30 minutes to implement

**When NOT to use:** Single-line fixes, typo corrections, or changes where requirements are unambiguous.

## Process

1. **Read context** — check for existing specs in `specs/` directory.
2. **Determine type** — feature, api, schema, or architecture spec.
3. **Read template** — load the appropriate template from `templates/specs/`.
4. **Surface assumptions** — list what you're assuming before writing
5. **Fill template** — populate all sections with concrete details.
6. **Validate** — ensure every section has content (no empty placeholders).
7. **Write** — save to `specs/<type>-<slug>.md`.

## Spec Format

All specs use Markdown + YAML frontmatter:

```markdown
---
type: feature | api | schema | architecture
status: draft | active | done
created: YYYY-MM-DD
tags: [tag1, tag2]
---

# Spec: Title

## Requirements / Endpoints / Tables / Modules
## Constraints
## Acceptance Criteria / Open Questions
```

## Surface Assumptions

Before writing any spec content, list what you're assuming:

```
ASSUMPTIONS I'M MAKING:
1. This is a web application (not native mobile)
2. Authentication uses session-based cookies (not JWT)
3. The database is PostgreSQL (based on existing Prisma schema)
4. We're targeting modern browsers only (no IE11)
→ Correct me now or I'll proceed with these.
```

Don't silently fill in ambiguous requirements.

## Rules

- Be specific. "Support authentication" is not a spec — "JWT tokens with 24h expiry" is.
- Every requirement must have acceptance criteria.
- Mark open questions explicitly — don't leave ambiguity hidden.
- One spec per concern. Don't mix unrelated features.
- Surface assumptions before writing spec content.

## Anti-Patterns

| Rationalization | Rebuttal |
|----------------|----------|
| "I'll just start coding" | No. Write the spec first. Code without spec is guessing. |
| "The requirements are obvious" | If they're obvious, writing them is easy. Write them. |
| "This will take too long" | Spec saves time. Coding without spec wastes time. |

## Output

A spec file saved to `specs/` with all sections filled.

## Verification

- [ ] Assumptions are surfaced before the spec is finalized
- [ ] Every requirement has matching acceptance criteria or open questions
- [ ] No placeholder sections remain empty
- [ ] The spec scope covers one coherent concern

## After

Run `/friday:plan` to break this spec into executable tasks.
