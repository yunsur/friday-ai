import assert from 'node:assert';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join, normalize } from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const packOutput = execFileSync('npm', ['pack', '--dry-run', '--json'], {
  cwd: ROOT,
  encoding: 'utf-8',
});

const [{ files }] = JSON.parse(packOutput);
const packedFiles = new Set(files.map((file) => normalize(file.path)));

const requiredFiles = [
  'package.json',
  'README.md',
  'README_zh.md',
  'bin/friday.js',
  'src/catalog.js',
  'src/setup.js',
  'templates/CLAUDE.md',
  '.claude-plugin/plugin.json',
  '.claude-plugin/marketplace.json',
  '.codex-plugin/plugin.json',
];

const forbiddenPatterns = [
  /^bin\/.*\.test\.js$/,
  /^src\/.*\.test\.js$/,
  /^scripts\//,
  /^PUBLISHING\.md$/,
  /^TESTING\.md$/,
  /^CLAUDE\.md$/,
];

for (const file of requiredFiles) {
  assert.ok(packedFiles.has(file), `${file} must be included in npm pack output`);
}

for (const file of packedFiles) {
  assert.ok(
    !forbiddenPatterns.some((pattern) => pattern.test(file)),
    `${file} should not be included in npm pack output`
  );
}

validatePluginPaths('.codex-plugin/plugin.json', [
  ['skills'],
  ['interface', 'logo'],
  ['interface', 'screenshots'],
]);

console.log(`Validated ${packedFiles.size} packed files`);

function validatePluginPaths(relativePath, pathKeys) {
  const json = JSON.parse(readFileSync(join(ROOT, relativePath), 'utf-8'));

  for (const keys of pathKeys) {
    const value = getValue(json, keys);

    if (!value) {
      continue;
    }

    if (Array.isArray(value)) {
      for (const item of value) {
        validateFileReference(relativePath, item);
      }
      continue;
    }

    validateFileReference(relativePath, value);
  }
}

function validateFileReference(relativePath, target) {
  const normalizedTarget = normalize(target);
  const absoluteTarget = join(ROOT, normalizedTarget);

  assert.ok(existsSync(absoluteTarget), `${relativePath} references missing path: ${target}`);
  assert.ok(packedFiles.has(normalizedTarget), `${relativePath} references unpacked path: ${target}`);
}

function getValue(obj, keys) {
  let current = obj;

  for (const key of keys) {
    current = current?.[key];
  }

  return current;
}
