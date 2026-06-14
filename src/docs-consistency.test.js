import assert from 'node:assert';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, it } from 'node:test';
import { fileURLToPath } from 'node:url';
import { AGENT_NAMES, COMMAND_SECTIONS } from './catalog.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const PROJECT_ROOT = join(__dirname, '..');
const DOCUMENTS = ['README.md', 'README_zh.md', 'templates/CLAUDE.md'];
const ALL_COMMANDS = COMMAND_SECTIONS.flatMap((section) => section.commands);

describe('documentation consistency', () => {
  function read(relativePath) {
    return readFileSync(join(PROJECT_ROOT, relativePath), 'utf-8');
  }

  it('should list every catalog command in user-facing docs', () => {
    for (const documentPath of DOCUMENTS) {
      const content = read(documentPath);

      for (const command of ALL_COMMANDS) {
        assert.ok(
          content.includes(`/${command.name}`),
          `${documentPath} should mention /${command.name}`,
        );
      }
    }
  });

  it('should list every agent in user-facing docs', () => {
    for (const documentPath of DOCUMENTS) {
      const content = read(documentPath);

      for (const agent of AGENT_NAMES) {
        assert.ok(content.includes(agent), `${documentPath} should mention agent ${agent}`);
      }
    }
  });

  it('should not reference the removed root friday command', () => {
    for (const documentPath of DOCUMENTS) {
      const content = read(documentPath);

      assert.ok(
        !content.includes('/friday              Auto-detect intent and route to the right skill'),
        `${documentPath} should not mention the removed root command`,
      );
    }
  });
});
