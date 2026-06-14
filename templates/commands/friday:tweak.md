---
description: Small change — skip brainstorm, make the tweak directly.
kind: quick-action
primary_agent: developer
skill_source: none
requires_skills: []
recommended_next: [friday:plan, friday:hotfix]
---

# Tweak

Make a small change without going through the full workflow.

## Input

$ARGUMENTS

## When to Use

- Text changes (copy, labels, messages)
- Configuration adjustments
- Documentation updates
- Prompt tweaks
- No new capabilities needed
- ≤3 simple tasks

## Process

1. **Understand** — know what needs to change
   - Read the current state
   - Identify the exact files
   - Clarify the desired outcome

2. **Change** — make the adjustments
   - One change at a time
   - Follow existing patterns
   - Keep changes minimal

3. **Verify** — confirm it works
   - Run related tests if they exist
   - Check the output looks correct
   - Verify no side effects

4. **Commit** — save the changes
   - Use conventional commits: `chore(scope): description` or `docs(scope): description`
   - Group related changes in one commit

## Rules

- No new features — just tweaks
- No new files unless absolutely necessary
- Follow existing style and patterns
- If scope grows, stop and use `/friday:plan` instead

## Anti-Patterns

| Rationalization | Rebuttal |
|----------------|----------|
| "I'll add this small feature too" | No. Tweak only. Features need planning. |
| "This config change won't break anything" | Verify anyway. Config changes break production. |
| "It's just text, no need to test" | Text changes break UX. Check the output. |

## Verification

- [ ] Changes are minimal and focused
- [ ] No new files added (unless necessary)
- [ ] Tests pass (if they exist)
- [ ] Output looks correct

## Output

A single commit with the tweaks.

## After

- If you need more changes, use another `/friday:tweak`
- If you're adding features, use `/friday:plan`
- If you're fixing bugs, use `/friday:hotfix`
