---
description: Code simplification — reduce complexity while preserving behavior.
kind: quick-action
primary_agent: developer
skill_source: none
requires_skills: []
recommended_next: [friday:review, friday:commit]
---

# Simplify

Simplify complex code while maintaining exact behavior.

## Input

$ARGUMENTS

## When to Use

- Code is hard to understand
- Functions are too long
- Too many nested conditions
- Duplicate logic scattered around
- Before adding new features to complex code

## Process

1. **Understand** — know what the code does
   - Read the code carefully
   - Understand the intent
   - Check for tests that verify behavior

2. **Identify** — find complexity
   - Long functions (>50 lines)
   - Deep nesting (>3 levels)
   - Duplicate code
   - Unclear variable names
   - Unnecessary abstractions

3. **Simplify** — reduce complexity
   - Extract functions
   - Flatten conditionals
   - Remove dead code
   - Rename for clarity
   - Delete unnecessary abstractions

4. **Verify** — confirm behavior unchanged
   - Run all tests
   - Check edge cases
   - Verify output is identical

## Rules

- Preserve exact behavior — no functional changes
- Understand before simplifying
- Make small, incremental changes
- Run tests after each change
- Don't simplify what you don't understand

## Anti-Patterns

| Rationalization | Rebuttal |
|----------------|----------|
| "I'll refactor this while I'm here" | Only if you're asked to. Don't refactor unrelated code. |
| "This abstraction will be useful later" | Maybe. But YAGNI. Remove it until you need it. |
| "It's complex but it works" | Understand why it works first, then simplify. |
| "I'll just rename everything" | Naming helps, but understand the logic first. |

## Verification

- [ ] Code behavior is preserved
- [ ] All tests pass
- [ ] Functions are shorter
- [ ] Nesting is reduced
- [ ] Duplication is removed
- [ ] Names are clearer

## Output

Simpler code with the same behavior.

## After

- Run `/friday:review` to verify quality
- Run `/friday:commit` to save the simplification
