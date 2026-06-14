---
description: Break a spec into executable tasks with file impact and verification.
kind: workflow
primary_agent: architect
skill_source: none
requires_skills: []
recommended_next: [friday:gen]
---

# Plan

Convert a spec into an ordered list of executable tasks.

## Input

$ARGUMENTS

## When to Use

- You have a spec or requirements for a multi-step task
- Before touching code
- When breaking down complex features

## Process

1. **Read spec** — load the relevant spec from `specs/`.
2. **Scan codebase** — understand existing structure and patterns.
3. **Map file structure** — list every file that needs to be created or modified.
4. **Order tasks** — dependencies first, then parallelizable work.
5. **Add verification** — each task gets a "done when" condition.
6. **Write plan** — save to `specs/<spec-name>-plan.md`.

## Bite-Sized Task Granularity

**Each step is one action (2-5 minutes):**
- "Write the failing test" - step
- "Run it to make sure it fails" - step
- "Implement the minimal code to make the test pass" - step
- "Run the tests and make sure they pass" - step
- "Commit" - step

## Output Format

```markdown
---
type: plan
spec: <original-spec>
status: pending
created: YYYY-MM-DD
---

# Plan: <Feature Name>

## File Structure

- `path/to/file.ts` — responsibility

## Tasks

### 1. [Task name]
- **Files:** `path/to/file.ts`
- **Done when:** [concrete verification condition]
- **Depends on:** none | task numbers

### 2. [Task name]
...
```

## Rules

- One logical change per task.
- Every task must have a "done when" — vague tasks create vague results.
- Respect existing patterns — don't introduce new conventions.
- If a task feels too big, split it.
- Estimate complexity: small / medium / large.
- Each task should be 2-5 minutes of work.

## Anti-Patterns

| Rationalization | Rebuttal |
|----------------|----------|
| "I'll just start coding" | No. Write the plan first. Code without plan is chaos. |
| "This task is too small to plan" | Small tasks are easy to plan. Plan them. |
| "I'll figure it out as I go" | You'll waste time. Plan ahead. |

## Output

A plan file saved to `specs/` with ordered tasks and dependencies.

## Verification

- [ ] Every task has a concrete "done when"
- [ ] File impact is explicit for each task
- [ ] Task order respects dependencies
- [ ] Tasks are small enough to execute without hidden subplans

## After

Run `/friday:gen` to start generating code from this plan.
