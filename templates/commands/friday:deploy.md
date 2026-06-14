---
description: Deployment workflows and CI/CD patterns. Integrates the ECC deployment-patterns skill.
kind: knowledge-guide
primary_agent: architect
skill_source: everything-claude-code
requires_skills: [deployment-patterns]
recommended_next: [friday:verify, friday:commit]
---

# Deploy

Deployment workflows, CI/CD patterns, and production readiness.

## Input

$ARGUMENTS

## When to Use

- Setting up CI/CD pipelines
- Dockerizing an application
- Planning deployment strategy
- Implementing health checks
- Preparing for production release
- Configuring environment-specific settings

## Process

This command integrates the **ECC deployment-patterns** skill for comprehensive deployment guidance.

1. **Load ECC Skill** — load `deployment-patterns` from everything-claude-code
   - Deployment strategies (rolling, blue-green, canary)
   - CI/CD pipeline patterns
   - Docker containerization
   - Health checks and readiness probes
   - Rollback strategies

2. **Plan Deployment** — choose strategy
   - Rolling deployment (default)
   - Blue-green deployment
   - Canary deployment
   - Feature flags

3. **Setup CI/CD** — configure pipeline
   - Build stage
   - Test stage
   - Deploy stage
   - Monitor stage

4. **Containerize** — Docker setup
   - Dockerfile
   - Docker Compose
   - Multi-stage builds
   - Health checks

5. **Verify** — production readiness
   - Health checks
   - Monitoring
   - Logging
   - Alerts

## Deployment Strategies

### Rolling Deployment (Default)
Replace instances gradually — old and new versions run simultaneously during rollout.

**Pros:** Zero downtime, gradual rollout
**Cons:** Slow rollback, version mismatch possible

### Blue-Green Deployment
Maintain two identical environments — switch traffic instantly.

**Pros:** Instant rollback, zero downtime
**Cons:** Costly (2x infrastructure), complex state management

### Canary Deployment
Route small percentage of traffic to new version — monitor before full rollout.

**Pros:** Risk mitigation, real-world testing
**Cons:** Complex routing, monitoring required

## CI/CD Pipeline Pattern

```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm ci
      - name: Run tests
        run: npm test
      - name: Build
        run: npm run build
      - name: Deploy
        run: npm run deploy
```

## Rules

- Prefer reversible rollout strategies over one-way deploys.
- Health checks, monitoring, and rollback are part of deployment design, not optional extras.
- Keep CI/CD pipelines explicit and reproducible across environments.

## Anti-Patterns

| Rationalization | Rebuttal |
|----------------|----------|
| "We'll deploy manually" | Manual deploys are error-prone. Automate. |
| "Skip tests in CI" | Tests in CI catch regressions. Never skip. |
| "We don't need health checks" | Health checks enable auto-recovery. Always add. |

## Verification

- [ ] CI/CD pipeline configured
- [ ] Tests run in pipeline
- [ ] Health checks implemented
- [ ] Rollback strategy defined
- [ ] Monitoring configured

## Output

Deployment configuration with CI/CD pipeline.

## After

- Run `/friday:verify` to ensure deployment readiness
- Run `/friday:commit` to save deployment config
