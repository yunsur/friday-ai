---
description: Turn rough ideas into structured designs through a focused interview.
kind: workflow
primary_agent: architect
skill_source: none
requires_skills: []
recommended_next: [friday:spec]
---

# Brainstorm

Transform a vague idea into a clear, actionable design brief.

## Input

$ARGUMENTS

## When to Use

- Starting any new feature or project
- Requirements are unclear or ambiguous
- You need to explore the problem space
- Before writing any code

<HARD-GATE>
Do NOT write any code until you have presented a design and the user has approved it.
</HARD-GATE>

## Process

1. **Explore project context** — check files, docs, recent commits
2. **Ask clarifying questions** — one at a time, understand purpose/constraints/success criteria
3. **Propose 2-3 approaches** — with trade-offs and your recommendation
4. **Present design** — in sections scaled to their complexity, get user approval
5. **Write design doc** — save to `specs/` directory
6. **Spec self-review** — check for placeholders, contradictions, ambiguity
7. **Transition to implementation** — run `/friday:spec` to create full spec

## Checklist

1. **Explore project context** — check files, docs, recent commits
2. **Ask clarifying questions** — one at a time, understand purpose/constraints/success criteria
3. **Propose 2-3 approaches** — with trade-offs and your recommendation
4. **Present design** — in sections scaled to their complexity
5. **Get user approval** — after each section
6. **Write design doc** — save to `specs/` directory

## Rules

- One question at a time. Don't overwhelm.
- Challenge assumptions — "why?" is your best tool.
- Push for specificity — "make it faster" is not a requirement.
- End with a concrete design brief, not a vague direction.
- Present design and get approval before writing any code.

## Anti-Patterns

| Rationalization | Rebuttal |
|----------------|----------|
| "This is too simple to need a design" | Every project needs a design. Simple ones need it most. |
| "I already know what to build" | Prove it. Write it down. Get approval. |
| "The user is in a hurry" | Haste creates waste. Design saves time. |

## Output

A structured brief with:
- Problem statement
- Success criteria
- Constraints
- Recommended approach
- Key decisions made

## Verification

- [ ] Open questions are surfaced one at a time
- [ ] Trade-offs between approaches are explicit
- [ ] User approval is captured before implementation begins
- [ ] The resulting brief is concrete enough to spec without guessing

## After

Run `/friday:spec` to turn this brief into a full spec.
