---
description: Systematic debugging — find and fix the root cause.
kind: quick-action
primary_agent: developer
skill_source: none
requires_skills: []
recommended_next: [friday:verify, friday:commit]
---

# Debug

Systematic debugging workflow for finding and fixing bugs.

## Input

$ARGUMENTS

## When to Use

- Failing tests
- Build errors
- Runtime exceptions
- Unexpected behavior
- Any time something is broken

## Process

1. **Reproduce** — confirm the issue exists
   - Run the failing command/test
   - Capture the exact error message
   - Note the steps to reproduce
   - Check if it's consistent or intermittent

2. **Localize** — find where the problem is
   - Read the error stack trace
   - Check recent changes (git log, git diff)
   - Add console.log/print statements if needed
   - Narrow down the code path

3. **Reduce** — simplify to the minimal case
   - Remove variables until you find the trigger
   - Create a minimal reproducible example
   - Isolate the failing component

4. **Fix** — implement the solution
   - Fix the root cause, not the symptom
   - Minimal changes only
   - Follow existing patterns

5. **Guard** — prevent regression
   - Add a test that catches this bug
   - Verify the test fails without the fix
   - Verify the test passes with the fix

## Rules

- Never guess — always verify with evidence
- One hypothesis at a time
- If you can't reproduce it, you can't fix it
- Fix the root cause, not the symptom
- Add a test to prevent regression

## Anti-Patterns

| Rationalization | Rebuttal |
|----------------|----------|
| "I think I know what's wrong" | Prove it. Add logging, check the evidence. |
| "It's probably just a race condition" | Maybe. But verify first. Don't assume. |
| "I'll fix it and see if it works" | No. Understand the cause first, then fix. |
| "The test is flaky" | Possibly. But investigate why. Don't skip. |

## Verification

- [ ] Error message captured
- [ ] Steps to reproduce documented
- [ ] Root cause identified
- [ ] Fix is minimal
- [ ] Test added to prevent regression
- [ ] All tests pass

## Output

A fix with a regression test.

## After

- Run `/friday:verify` to ensure no regressions
- Run `/friday:commit` to save the fix
