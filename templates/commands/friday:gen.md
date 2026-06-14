---
description: Generate code from a spec and plan.
kind: workflow
primary_agent: developer
skill_source: none
requires_skills: []
recommended_next: [friday:review]
---

# Gen

Generate or modify code based on a spec and plan.

## Input

$ARGUMENTS

## When to Use

- A spec and implementation plan already exist
- You want to execute a planned change without reopening design
- The next step is implementation, not further scoping

## Process

1. **Read plan** — load the plan from `specs/`.
2. **Read spec** — load the original spec for context.
3. **Scan codebase** — understand existing patterns, style, conventions.
4. **Execute tasks** — work through the plan in order:
   - For each task, implement the change.
   - Verify against the "done when" condition.
   - Move to next task.
5. **Report progress** — after each task, show what was done.

## Rules

- Follow existing code style — don't introduce new patterns.
- One task at a time. Don't skip ahead.
- If a task is unclear, stop and ask — don't guess.
- Minimal changes — don't refactor unrelated code.
- Run tests after each task if test infrastructure exists.

## Verification

- [ ] Every implemented task maps back to the plan
- [ ] Relevant verification commands ran after code changes
- [ ] No unrelated files or features were added
- [ ] Any ambiguity was resolved before coding

## Output

Code changes with brief explanation of what was generated.

## After

Run `/friday:review` to check code against the spec.
