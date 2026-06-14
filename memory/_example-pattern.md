---
type: pattern
created: 2026-06-14
updated: 2026-06-14
tags: [debugging, auth, tls]
confidence: medium
---

# Debugging TLS Certificate Errors

## What
When encountering ERR_TLS_CERT errors, check these common causes:

1. Expired certificate
2. Self-signed certificate in production
3. Missing intermediate certificates
4. hostname mismatch

## Why
This pattern recurs across multiple projects and environments.

## Evidence
- Fixed in project A (2026-05)
- Fixed in project B (2026-06)
- Common in development environments

## When to Apply
- When TLS/SSL errors occur
- During deployment issues
- When setting up new environments
