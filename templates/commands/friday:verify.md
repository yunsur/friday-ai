---
description: Verify requirement coverage, evidence, and residual risk.
kind: workflow
primary_agent: tester
skill_source: none
requires_skills: []
recommended_next: [friday:commit]
---

# Verify

Check that implementation covers all requirements with evidence.

## Input

$ARGUMENTS

## When to Use

- Before claiming work is complete
- Before committing or creating PRs
- When verifying requirement coverage

**Core principle:** Evidence before claims, always.

## Process

1. **Read spec** — load the relevant spec from `specs/`.
2. **Run verification commands** — execute tests, linter, build
3. **Read implementation** — scan the code that was built.
4. **Map requirements** — for each requirement, find evidence in code.
5. **Assess coverage** — what's covered, what's missing.
6. **Identify risks** — what could still go wrong.

## The Gate Function

```
BEFORE claiming any status or expressing satisfaction:

1. IDENTIFY: What command proves this claim?
2. RUN: Execute the FULL command (fresh, complete)
3. READ: Full output, check exit code, count failures
4. VERIFY: Does output confirm the claim?
   - If NO: State actual status with evidence
   - If YES: State claim WITH evidence
5. ONLY THEN: Make the claim

Skip any step = lying, not verifying
```

## Output Format

### Verification Evidence

```
$ npm test
✓ 42 tests passed
✓ 0 failures
✓ Coverage: 87%

$ npm run lint
✓ 0 errors
✓ 0 warnings

$ npm run build
✓ Build successful
```

### Coverage Report

| Requirement | Status | Evidence | Risk |
|-------------|--------|----------|------|
| REQ-001 | ✅ Implemented | `file.ts:42` | Low |
| REQ-002 | ⚠️ Partial | `file.ts:78` | Medium |
| REQ-003 | ❌ Missing | — | High |

## Rules

- Be objective — evidence-based assessment.
- Don't skip requirements — check every one.
- Rate risk honestly — don't minimize.
- Provide specific evidence — file paths and line numbers.
- Run verification commands before making claims.

## Anti-Patterns

| Rationalization | Rebuttal |
|----------------|----------|
| "Tests should pass" | Run them. Don't assume. |
| "I'll verify later" | Verify now. Claims without evidence are lies. |
| "It looks correct" | Looks aren't evidence. Run the tests. |

## Output

Coverage report with requirement-to-code mapping and residual risks.

## Verification

- [ ] All relevant verification commands were actually run
- [ ] Requirement coverage is backed by concrete evidence
- [ ] Residual risks are stated explicitly, not implied away
- [ ] Final status claims match command output and code inspection
