---
description: Review code against a spec for consistency and completeness. Integrates the ECC code-review skill.
kind: workflow
primary_agent: tester
skill_source: everything-claude-code
requires_skills: [code-review]
recommended_next: [friday:verify]
---

# Review

Audit code changes against the spec. Find gaps, not opinions.

## Input

$ARGUMENTS

## When to Use

- After implementation is complete and before claiming readiness
- When you need a spec-aware audit instead of a style review
- Before handoff, commit, or PR creation

## Process

This command integrates the **ECC code-review** skill for comprehensive review guidance.

1. **Load ECC Skill** — load `code-review` from everything-claude-code
   - Five-axis review (correctness, readability, architecture, security, performance)
   - Severity classification (Critical/Important/Suggestion)
   - Change sizing guidelines

2. **Read spec** — load the relevant spec from `specs/`.
3. **Read changed files** — focus on what was modified (git diff).
4. **Check coverage** — does the code cover every requirement?
5. **Check acceptance criteria** — is every criterion met?
6. **Check constraints** — are all constraints respected?
7. **Report findings** — severity-ordered list of issues.

## Output Format

### Findings

| Severity | File | Issue | Spec Reference |
|----------|------|-------|----------------|
| 🔴 critical | path/to/file | description | requirement X |
| 🟡 warning | path/to/file | description | constraint Y |
| 🔵 info | path/to/file | description | — |

### Coverage

- [x] Requirement 1 — implemented in `file.ts:42`
- [ ] Requirement 2 — **missing**
- [x] Constraint A — respected

### Verdict

**PASS** / **FAIL** — brief explanation

## Rules

- Focus on spec compliance, not style preferences.
- Every finding must reference a specific spec section.
- Don't suggest refactors — that's a separate concern.
- Be concrete: "missing rate limiting on /api/login" not "should add validation".

## Verification

- [ ] Every finding points to a concrete spec section or requirement
- [ ] Changed files were reviewed, not inferred
- [ ] Coverage status is explicit for all major requirements
- [ ] Verdict matches the evidence presented

## Output

Review report with findings, coverage, and verdict.

## After

- Run `/friday:verify` to validate evidence and residual risk
- Fix high-severity findings before moving to `/friday:commit`
