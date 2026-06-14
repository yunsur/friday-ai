import assert from 'node:assert';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, it } from 'node:test';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const PROJECT_ROOT = join(__dirname, '..');
const ROOT_CLAUDE = read(join(PROJECT_ROOT, 'CLAUDE.md'));
const TEMPLATE_CLAUDE = read(join(PROJECT_ROOT, 'templates', 'CLAUDE.md'));
const SHARED_RULES = [
  "Keep it simple. If a rule doesn't save time, delete it.",
  'Every command is independently runnable. Workflow commands may still recommend the next step.',
  'Spec-first: brainstorm → spec → plan → gen → review → verify → commit.',
  'Conventional Commits: `type(scope): subject`',
  'Never push directly to main.',
  'One logical change per commit.',
];

describe('CLAUDE docs consistency', () => {
  it('should keep shared principles aligned between root and template CLAUDE docs', () => {
    for (const rule of SHARED_RULES) {
      assert.ok(ROOT_CLAUDE.includes(rule), `CLAUDE.md should include: ${rule}`);
      assert.ok(TEMPLATE_CLAUDE.includes(rule), `templates/CLAUDE.md should include: ${rule}`);
    }
  });

  it('should keep repository-specific test guidance only in the root CLAUDE doc', () => {
    assert.ok(ROOT_CLAUDE.includes('Run `npm test` before push.'));
    assert.ok(!TEMPLATE_CLAUDE.includes('Run `npm test` before push.'));
    assert.ok(TEMPLATE_CLAUDE.includes('Run `npm test` (or equivalent) before push.'));
  });
});

function read(path) {
  return readFileSync(path, 'utf-8');
}
