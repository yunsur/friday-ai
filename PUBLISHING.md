# Publishing Guide

This guide explains how to publish friday to npm and plugin marketplaces.

**Project Homepage:** `package.json` → `homepage`

**Project Repository:** `package.json` → `repository`

## Prerequisites

- Node.js >= 18
- npm account
- GitHub account
- Git configured with your credentials

## Publishing to npm

### 1. Setup npm Account

```bash
# Login to npm
npm login
```

### 2. Update Version

Edit `package.json` and update the version, then sync plugin manifests:

```json
{
  "name": "friday",
  "version": "x.y.z"
}
```

```bash
npm run sync:metadata
```

### 3. Pre-publish Checks

```bash
# Sync derived metadata
npm run sync:metadata

# Run tests
npm test

# Validate packed contents, forbidden files, and plugin references
npm run check:package

# Verify final package file list
npm pack --dry-run
```

### 4. Publish

```bash
# Publish to npm
npm publish
```

### 5. Verify

```bash
# Check package
npm info friday

# Test help output
npx friday --help

# Test version output
npx friday --version

# Test install
npx friday init
```

---

## Publishing to Claude Code Plugin Marketplace

### 1. Prerequisites

- GitHub repository page: match `package.json` → `homepage`
- Git clone URL: match `package.json` → `repository`
- `.claude-plugin/plugin.json` configured
- `.claude-plugin/marketplace.json` configured

### 2. Submit to Marketplace

**Option A: Official Anthropic Marketplace**

1. Fork the repository
2. Create a PR to `anthropics/claude-code-plugins`
3. Wait for review and approval

**Option B: Your Own Marketplace**

1. Create a marketplace repository for your org/user
2. Add your plugin to the marketplace
3. Users install with:
   ```bash
   /plugin marketplace add <owner>/<marketplace-repo>
   /plugin install friday
   ```

---

## Publishing to Codex Plugin Marketplace

### 1. Prerequisites

- GitHub repository page: match `package.json` → `homepage`
- Git clone URL: match `package.json` → `repository`
- `.codex-plugin/plugin.json` configured

### 2. Submit to Codex Marketplace

1. Fork the repository
2. Create a PR to `openai/codex-plugins`
3. Wait for review and approval

---

## Version Management

### Versioned Files

Friday tracks versions in these files:

| File | Field |
|------|-------|
| `package.json` | `version` |
| `.claude-plugin/plugin.json` | `version` |
| `.claude-plugin/marketplace.json` | `plugins.0.version` |
| `.codex-plugin/plugin.json` | `version` |

### Sync Version and Metadata

```bash
# 1. Edit package.json version/author/homepage/repository if needed
# 2. Sync derived manifests
npm run sync:metadata
```

---

## Release Checklist

- [ ] Update `package.json` version if needed
- [ ] Run `npm run sync:metadata`
- [ ] Run tests: `npm test`
- [ ] Run `npm run check:package`
- [ ] Verify help output: `npx friday --help`
- [ ] Verify install path: `npx friday init`
- [ ] Commit changes: `git commit -m "chore: release vx.y.z"`
- [ ] Tag release: `git tag vx.y.z`
- [ ] Push: `git push origin main --tags`
- [ ] Publish to npm: `npm publish`
- [ ] Submit PR to plugin marketplaces
