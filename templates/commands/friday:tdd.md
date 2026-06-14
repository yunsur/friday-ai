---
description: Test-driven development — RED-GREEN-REFACTOR cycle. Integrates the ECC tdd-workflow skill.
kind: quick-action
primary_agent: developer
skill_source: everything-claude-code
requires_skills: [tdd-workflow]
recommended_next: [friday:review, friday:commit]
---

# TDD

Test-driven development workflow: write tests first, then implement.

## Input

$ARGUMENTS

## When to Use

- Implementing new features
- Fixing bugs (write failing test first)
- Any code that needs to be reliable
- When you want confidence in your code

## Process

This command integrates the **ECC tdd-workflow** skill for comprehensive TDD guidance.

1. **Load ECC Skill** — load `tdd-workflow` from everything-claude-code
   - Coverage requirements (80%+ minimum)
   - Test types (unit, integration, E2E)
   - TDD workflow steps

2. **RED** — write a failing test
   - Write the simplest test that fails
   - Run it to confirm it fails
   - Check the error message makes sense

3. **GREEN** — write minimal code to pass
   - Write the simplest code that makes the test pass
   - Don't add extra features
   - Run the test to confirm it passes

4. **REFACTOR** — improve the code
   - Clean up the code
   - Remove duplication
   - Improve naming
   - Run tests to ensure nothing broke

5. **REPEAT** — continue the cycle
   - Write the next test
   - Make it pass
   - Refactor
   - Stop when done

## Rules

- Never write production code without a failing test first
- Write the simplest test that fails
- Write the simplest code that passes
- Refactor only when tests are green
- One test at a time
- Tests are documentation — make them clear

## Anti-Patterns

| Rationalization | Rebuttal |
|----------------|----------|
| "I'll write tests later" | No. Write the test first. That's the point of TDD. |
| "This is too simple to test" | If it's too simple to test, it's too simple to break. Test it. |
| "I'll just write the code and test after" | You'll skip the tests. Write them first. |
| "The test is too hard to write" | If the test is hard, the design is wrong. Refactor. |

## Verification

- [ ] Test fails before implementation (RED)
- [ ] Test passes after implementation (GREEN)
- [ ] Code is refactored (REFACTOR)
- [ ] All tests pass
- [ ] Test is clear and readable
- [ ] Coverage meets 80% minimum

## Output

Working code with comprehensive tests.

## After

- Run `/friday:review` to check code quality
- Run `/friday:commit` to save your work
