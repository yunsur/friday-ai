---
description: Security review — find and fix security vulnerabilities. Integrates the ECC security-review skill.
kind: quick-action
primary_agent: tester
skill_source: everything-claude-code
requires_skills: [security-review]
recommended_next: [friday:verify, friday:commit]
---

# Security

Security review workflow for finding and fixing vulnerabilities.

## Input

$ARGUMENTS

## When to Use

- Before deploying to production
- When handling user input
- When working with authentication/authorization
- When processing sensitive data
- Regular security audits

## Process

This command integrates the **ECC security-review** skill for comprehensive security guidance.

1. **Load ECC Skill** — load `security-review` from everything-claude-code
   - Security checklist
   - OWASP Top 10 prevention
   - Input validation patterns
   - Authentication best practices

2. **Scan** — identify potential vulnerabilities
   - Check for common issues (OWASP Top 10)
   - Review input validation
   - Check authentication/authorization
   - Review data handling
   - Check dependencies

3. **Classify** — prioritize by severity
   - Critical: immediate fix required
   - High: fix before release
   - Medium: fix soon
   - Low: fix when convenient

4. **Fix** — implement security measures
   - Input validation and sanitization
   - Proper authentication checks
   - Secure data storage
   - Safe error handling
   - Dependency updates

5. **Verify** — confirm fixes work
   - Test the vulnerability is fixed
   - Run security tests
   - Check for regressions

## Common Vulnerabilities

| Vulnerability | Check For |
|--------------|-----------|
| Injection | SQL, NoSQL, OS command injection |
| Broken Auth | Weak passwords, session management |
| Sensitive Data | Unencrypted storage, exposure |
| XXE | XML external entity injection |
| Broken Access | Missing authorization checks |
| Security Misconfiguration | Default credentials, unnecessary features |
| XSS | Cross-site scripting vulnerabilities |
| Insecure Deserialization | Untrusted data deserialization |
| Using Components | Known vulnerabilities in dependencies |
| Insufficient Logging | Missing audit trails |

## Rules

- Never trust user input
- Validate and sanitize all data
- Use parameterized queries
- Implement proper authentication
- Encrypt sensitive data
- Follow principle of least privilege
- Log security events

## Anti-Patterns

| Rationalization | Rebuttal |
|----------------|----------|
| "It's just an internal tool" | Internal tools get hacked too. Secure them. |
| "Users won't try to break it" | Some will. Assume hostile input. |
| "We'll add security later" | Later never comes. Add it now. |
| "This library handles security" | Verify. Don't assume. |

## Verification

- [ ] Input validation implemented
- [ ] Authentication required where needed
- [ ] Authorization checks in place
- [ ] Sensitive data encrypted
- [ ] Error messages don't leak info
- [ ] Dependencies are up to date
- [ ] Security logging enabled

## Output

Security fixes with verification tests.

## After

- Run `/friday:verify` to ensure no regressions
- Run `/friday:commit` to save the fixes
- Consider adding security tests to CI/CD
