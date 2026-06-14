---
description: Quick bug fix — skip brainstorm, fix the issue directly.
kind: quick-action
primary_agent: developer
skill_source: none
requires_skills: []
recommended_next: [friday:tdd, friday:tweak, friday:plan]
---

# Hotfix

Fix an existing bug quickly without going through the full workflow.

## Input

$ARGUMENTS

## When to Use

- Bug in existing functionality
- No new capabilities needed
- Scope is controlled (usually ≤2 files)
- You know what's broken

## Process

1. **Reproduce** — confirm the bug exists
   - Run the failing test or command
   - Capture the exact error message
   - Note the expected vs actual behavior

2. **Locate** — find the root cause
   - Read the error stack trace
   - Check recent changes (git log)
   - Understand the code path

3. **Fix** — implement the minimal fix
   - Change only what's necessary
   - Don't refactor unrelated code
   - Follow existing patterns

4. **Verify** — confirm the fix works
   - Run the failing test again
   - Run the full test suite
   - Check for regressions

5. **Commit** — save the fix
   - Use conventional commits: `fix(scope): description`
   - Reference the issue if applicable

## Rules

- Minimal changes only — no refactoring
- Fix the bug, not the code around it
- If scope grows beyond 2 files, stop and use `/friday:plan` instead
- Run tests before and after
- Document what was broken and why

## Anti-Patterns

| Rationalization | Rebuttal |
|----------------|----------|
| "I'll refactor while I'm here" | No. Fix the bug only. Refactor separately. |
| "This is a good time to add tests" | Add the failing test first, then fix. Don't add unrelated tests. |
| "The fix is obvious, I'll skip verification" | Obvious fixes break production. Run the tests. |

## Verification

- [ ] Bug is reproduced before fix
- [ ] Root cause is identified
- [ ] Fix is minimal (≤2 files changed)
- [ ] All tests pass
- [ ] No regressions introduced

## Output

A single commit with the bug fix.

## After

- If you need more changes, use `/friday:tweak` or `/friday:plan`
- If you want to add tests, use `/friday:tdd`
