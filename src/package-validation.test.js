import { describe, it } from 'node:test';
import assert from 'node:assert';
import { execFile } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { promisify } from 'node:util';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const PROJECT_ROOT = join(__dirname, '..');
const execFileAsync = promisify(execFile);

describe('package validation', () => {
  function readJson(relativePath) {
    return JSON.parse(readFileSync(join(PROJECT_ROOT, relativePath), 'utf-8'));
  }

  it('should not keep an unused skills runtime dependency', () => {
    const pkg = readJson('package.json');

    assert.ok(!pkg.dependencies?.skills, 'skills should not be a runtime dependency');
  });

  it('should declare a minimal npm files whitelist', () => {
    const pkg = readJson('package.json');

    assert.deepStrictEqual(pkg.files, [
      'bin/friday.js',
      'src/catalog.js',
      'src/setup.js',
      'templates/',
      '.claude-plugin/',
      '.codex-plugin/',
      'README.md',
      'README_zh.md',
    ]);
  });

  it('should not reference missing codex plugin assets', () => {
    const plugin = readJson('.codex-plugin/plugin.json');

    assert.ok(!plugin.skills, 'Codex plugin should not reference a missing skills directory');
    assert.ok(!plugin.interface.logo, 'Codex plugin should not reference a missing logo asset');
  });

  it('should not pack tests, scripts, or internal docs', async () => {
    const { stdout } = await execFileAsync('npm', ['pack', '--dry-run', '--json'], {
      cwd: PROJECT_ROOT,
    });
    const [{ files }] = JSON.parse(stdout);
    const packedFiles = files.map((file) => file.path);

    assert.ok(!packedFiles.includes('bin/friday.test.js'), 'CLI tests should not be packed');
    assert.ok(!packedFiles.includes('src/setup.test.js'), 'Setup tests should not be packed');
    assert.ok(!packedFiles.includes('src/metadata.test.js'), 'Metadata tests should not be packed');
    assert.ok(!packedFiles.includes('src/package-validation.test.js'), 'Package validation tests should not be packed');
    assert.ok(!packedFiles.includes('scripts/check-package.js'), 'Packaging scripts should not be packed');
    assert.ok(!packedFiles.includes('scripts/sync-metadata.js'), 'Metadata scripts should not be packed');
    assert.ok(!packedFiles.includes('PUBLISHING.md'), 'Publishing guide should not be packed');
    assert.ok(!packedFiles.includes('TESTING.md'), 'Testing guide should not be packed');
    assert.ok(!packedFiles.includes('CLAUDE.md'), 'Repository-only CLAUDE guide should not be packed');
  });

  it('should validate npm pack contents', async () => {
    const { stdout } = await execFileAsync('node', ['scripts/check-package.js'], {
      cwd: PROJECT_ROOT,
    });

    assert.ok(stdout.includes('Validated '), 'Package validation script should succeed');
  });
});
