# Testing

This document explains how to run tests for the friday project.

## Prerequisites

- Node.js >= 18

## Running Tests

### Run all tests

```bash
npm test
```

Or directly with Node.js:

```bash
node --test src/*.test.js bin/*.test.js
```

### Run specific test files

```bash
# Run setup tests only
node --test src/setup.test.js

# Run CLI tests only
node --test bin/friday.test.js
```

### Manual smoke checks

```bash
node bin/friday.js --help
node bin/friday.js --version
node bin/friday.js init --force
npm run check:package
```

### Run tests with verbose output

```bash
node --test --test-reporter spec src/*.test.js bin/*.test.js
```

## Test Files

| File | Description |
|------|-------------|
| `src/setup.test.js` | Tests for the setup/installer functionality |
| `src/metadata.test.js` | Tests for package/plugin metadata consistency |
| `src/package-validation.test.js` | Tests for packed contents and plugin resource references |
| `src/docs-consistency.test.js` | Tests for README and template command/agent coverage |
| `src/claude-consistency.test.js` | Tests for shared rules between root and template CLAUDE docs |
| `src/command-design.test.js` | Tests for command metadata, skill boundaries, and template skeleton |
| `bin/friday.test.js` | Tests for the CLI entry point |

## Test Coverage

Tests cover:

- Template file existence
- Command file format (YAML frontmatter)
- CLI help output
- CLI help flag output
- CLI version output
- CLI invalid-argument handling
- Init install behavior
- Re-run skip behavior
- Refresh install behavior
- Deprecated command removal
- Invalid settings.local.json handling
- Package/plugin metadata consistency
- npm pack required/forbidden content validation
- README and template catalog coverage
- Shared CLAUDE rule alignment
- Command metadata and skeleton consistency
- Package.json configuration
- Agent templates
- Spec templates
- Memory templates

## Writing New Tests

1. Create a new file with `.test.js` extension
2. Import test utilities from `node:test` and `node:assert`
3. Write test cases using `describe` and `it`
4. Add the test file to the `test` script in `package.json`

Example:

```javascript
import { describe, it } from 'node:test';
import assert from 'node:assert';

describe('my feature', () => {
  it('should do something', () => {
    assert.strictEqual(1 + 1, 2);
  });
});
```

## CI/CD Integration

Add to your CI pipeline:

```yaml
- name: Run tests
  run: npm test
```
