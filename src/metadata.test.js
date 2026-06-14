import assert from 'node:assert';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, it } from 'node:test';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const PROJECT_ROOT = join(__dirname, '..');

describe('metadata consistency', () => {
  function readJson(relativePath) {
    return JSON.parse(readFileSync(join(PROJECT_ROOT, relativePath), 'utf-8'));
  }

  it('should keep package metadata populated', () => {
    const pkg = readJson('package.json');

    assert.strictEqual(pkg.author.name, 'yunsur');
    assert.strictEqual(pkg.author.url, 'https://github.com/yunsur/friday-ai');
    assert.strictEqual(pkg.homepage, 'https://github.com/yunsur/friday-ai');
    assert.strictEqual(pkg.repository, 'git@github.com:yunsur/friday-ai.git');
  });

  it('should keep claude plugin metadata in sync with package metadata', () => {
    const pkg = readJson('package.json');
    const plugin = readJson('.claude-plugin/plugin.json');
    const marketplace = readJson('.claude-plugin/marketplace.json');

    assert.strictEqual(plugin.version, pkg.version);
    assert.deepStrictEqual(plugin.author, pkg.author);
    assert.strictEqual(plugin.homepage, pkg.homepage);
    assert.strictEqual(plugin.repository, pkg.repository);

    assert.strictEqual(marketplace.name, pkg.author.name);
    assert.strictEqual(marketplace.plugins[0].version, pkg.version);
    assert.deepStrictEqual(marketplace.owner, pkg.author);
    assert.deepStrictEqual(marketplace.plugins[0].author, pkg.author);
  });

  it('should keep codex plugin metadata in sync with package metadata', () => {
    const pkg = readJson('package.json');
    const plugin = readJson('.codex-plugin/plugin.json');

    assert.strictEqual(plugin.version, pkg.version);
    assert.deepStrictEqual(plugin.author, pkg.author);
    assert.strictEqual(plugin.homepage, pkg.homepage);
    assert.strictEqual(plugin.repository, pkg.repository);
    assert.strictEqual(plugin.interface.developerName, pkg.author.name);
    assert.strictEqual(plugin.interface.websiteURL, pkg.homepage);
  });
});
