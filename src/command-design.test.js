import assert from 'node:assert';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, it } from 'node:test';
import { fileURLToPath } from 'node:url';
import { AGENT_NAMES, COMMANDS, CORE_COMMANDS } from './catalog.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const PROJECT_ROOT = join(__dirname, '..');
const ALL_COMMAND_NAMES = new Set(COMMANDS.map((command) => command.name));
const CATALOG_BY_NAME = new Map(COMMANDS.map((command) => [command.name, command]));
const REQUIRED_SECTIONS = [
  '## When to Use',
  '## Process',
  '## Rules',
  '## Verification',
  '## Output',
];
const VALID_SKILL_SOURCES = new Set(['none', 'skills.sh', 'everything-claude-code']);

describe('command design', () => {
  function readCommand(relativePath) {
    return readFileSync(join(PROJECT_ROOT, 'templates', 'commands', relativePath), 'utf-8');
  }

  function parseFrontmatter(content) {
    const match = content.match(/^---\n([\s\S]*?)\n---/);
    assert.ok(match, 'Command template should include frontmatter');

    const metadata = {};
    for (const line of match[1].split('\n')) {
      const [key, ...rest] = line.split(':');
      metadata[key.trim()] = parseValue(rest.join(':').trim());
    }

    return metadata;
  }

  it('should give every command machine-readable metadata', () => {
    for (const relativePath of CORE_COMMANDS) {
      const commandName = relativePath.replace(/\.md$/, '');
      const catalogEntry = CATALOG_BY_NAME.get(commandName);
      const metadata = parseFrontmatter(readCommand(relativePath));

      assert.ok(catalogEntry, `${commandName} should exist in the catalog`);
      assert.strictEqual(
        metadata.kind,
        catalogEntry.kind,
        `${commandName} should declare the right kind`,
      );
      assert.ok(
        isDescriptionAligned(catalogEntry.description, metadata.description),
        `${commandName} frontmatter description should stay aligned with catalog description`,
      );
      assert.ok(
        AGENT_NAMES.includes(metadata.primary_agent),
        `${commandName} should declare a valid primary agent`,
      );
      assert.ok(
        VALID_SKILL_SOURCES.has(metadata.skill_source),
        `${commandName} should declare a valid skill source`,
      );
      assert.ok(
        Array.isArray(metadata.requires_skills),
        `${commandName} should declare requires_skills as an array`,
      );
      assert.ok(
        Array.isArray(metadata.recommended_next),
        `${commandName} should declare recommended_next as an array`,
      );

      for (const nextCommand of metadata.recommended_next) {
        assert.ok(
          ALL_COMMAND_NAMES.has(nextCommand),
          `${commandName} should recommend only existing commands`,
        );
        assert.notStrictEqual(
          nextCommand,
          commandName,
          `${commandName} should not recommend itself`,
        );
      }

      if (metadata.skill_source === 'everything-claude-code') {
        assert.ok(
          metadata.requires_skills.length > 0,
          `${commandName} should declare ECC skill dependencies`,
        );
      }

      if (metadata.skill_source === 'none') {
        assert.strictEqual(
          metadata.requires_skills.length,
          0,
          `${commandName} should not declare skill dependencies`,
        );
      }
    }
  });

  it('should keep a consistent command skeleton', () => {
    for (const relativePath of CORE_COMMANDS) {
      const content = readCommand(relativePath);

      for (const heading of REQUIRED_SECTIONS) {
        assert.ok(content.includes(heading), `${relativePath} should include ${heading}`);
      }
    }
  });
});

function parseValue(value) {
  if (value === '[]') {
    return [];
  }

  if (value.startsWith('[') && value.endsWith(']')) {
    return value
      .slice(1, -1)
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return value;
}

function isDescriptionAligned(shortDescription, longDescription) {
  const shortWords = normalizeWords(shortDescription);
  const longWords = normalizeWords(longDescription);
  let index = 0;

  for (const word of longWords) {
    if (word === shortWords[index]) {
      index += 1;
    }

    if (index === shortWords.length) {
      return true;
    }
  }

  return shortWords.length === 0;
}

function normalizeWords(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}
