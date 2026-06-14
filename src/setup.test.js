import assert from 'node:assert';
import { execFile } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { after, before, describe, it } from 'node:test';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';
import { AGENT_FILES, CORE_COMMANDS, MEMORY_TEMPLATES, SPEC_TEMPLATES } from './catalog.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const PROJECT_ROOT = join(__dirname, '..');
const FRIDAY_CLI = join(PROJECT_ROOT, 'bin', 'friday.js');
const execFileAsync = promisify(execFile);

describe('friday setup', () => {
  const testDir = mkdtempSync(join(tmpdir(), 'friday-setup-test-'));
  const originalCwd = process.cwd();
  const firstCommandTemplate = CORE_COMMANDS[0];
  const firstSpecTemplate = SPEC_TEMPLATES[0];
  const firstMemoryTemplate = MEMORY_TEMPLATES[0];

  before(() => {
    mkdirSync(testDir, { recursive: true });
    process.chdir(testDir);
  });

  after(() => {
    // Cleanup
    process.chdir(originalCwd);
    if (existsSync(testDir)) {
      rmSync(testDir, { recursive: true });
    }
  });

  describe('template files exist', () => {
    it('should have CLAUDE.md template', () => {
      const templatePath = join(PROJECT_ROOT, 'templates', 'CLAUDE.md');
      assert.ok(existsSync(templatePath), 'CLAUDE.md template should exist');
    });

    it('should have all command templates', () => {
      const commandsDir = join(PROJECT_ROOT, 'templates', 'commands');
      for (const cmd of CORE_COMMANDS) {
        const cmdPath = join(commandsDir, cmd);
        assert.ok(existsSync(cmdPath), `Command ${cmd} should exist`);
      }

      assert.ok(
        !existsSync(join(commandsDir, 'friday.md')),
        'Removed root command should not exist',
      );
    });

    it('should have all agent templates', () => {
      const agentsDir = join(PROJECT_ROOT, 'templates', 'agents');
      for (const agent of AGENT_FILES) {
        const agentPath = join(agentsDir, agent);
        assert.ok(existsSync(agentPath), `Agent ${agent} should exist`);
      }
    });

    it('should have spec templates', () => {
      const specsDir = join(PROJECT_ROOT, 'templates', 'specs');
      for (const spec of SPEC_TEMPLATES) {
        const specPath = join(specsDir, spec);
        assert.ok(existsSync(specPath), `Spec ${spec} should exist`);
      }
    });

    it('should have memory templates', () => {
      const memoryDir = join(PROJECT_ROOT, 'templates', 'memory');
      for (const mem of MEMORY_TEMPLATES) {
        const memPath = join(memoryDir, mem);
        assert.ok(existsSync(memPath), `Memory template ${mem} should exist`);
      }
    });
  });

  describe('command file format', () => {
    it('should have YAML frontmatter with description', () => {
      const cmdPath = join(PROJECT_ROOT, 'templates', 'commands', 'friday:hotfix.md');
      const content = readFileSync(cmdPath, 'utf-8');

      assert.ok(content.startsWith('---'), 'Should start with frontmatter delimiter');
      assert.ok(content.includes('description:'), 'Should have description field');
      assert.ok(content.includes('# Hotfix'), 'Should have heading');
    });

    it('should have required sections', () => {
      const cmdPath = join(PROJECT_ROOT, 'templates', 'commands', 'friday:hotfix.md');
      const content = readFileSync(cmdPath, 'utf-8');

      assert.ok(content.includes('## When to Use'), 'Should have When to Use section');
      assert.ok(content.includes('## Process'), 'Should have Process section');
      assert.ok(content.includes('## Rules'), 'Should have Rules section');
      assert.ok(content.includes('## Verification'), 'Should have Verification section');
    });
  });

  describe('CLI entry point', () => {
    it('should have friday.js executable', () => {
      const cliPath = join(PROJECT_ROOT, 'bin', 'friday.js');
      assert.ok(existsSync(cliPath), 'friday.js should exist');
    });

    it('should have shebang line', () => {
      const cliPath = join(PROJECT_ROOT, 'bin', 'friday.js');
      const content = readFileSync(cliPath, 'utf-8');

      assert.ok(content.startsWith('#!/usr/bin/env node'), 'Should have shebang line');
    });
  });

  describe('package.json', () => {
    it('should have correct name', () => {
      const pkgPath = join(PROJECT_ROOT, 'package.json');
      const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));

      assert.strictEqual(pkg.name, 'friday', 'Package name should be friday');
    });

    it('should have bin entry', () => {
      const pkgPath = join(PROJECT_ROOT, 'package.json');
      const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));

      assert.ok(pkg.bin, 'Should have bin entry');
      assert.ok(pkg.bin.friday, 'Should have friday bin entry');
    });

    it('should have test script', () => {
      const pkgPath = join(PROJECT_ROOT, 'package.json');
      const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));

      assert.ok(pkg.scripts, 'Should have scripts');
      assert.ok(pkg.scripts['check:package'], 'Should have package check script');
      assert.ok(pkg.scripts['sync:metadata'], 'Should have metadata sync script');
      assert.ok(pkg.scripts.test, 'Should have test script');
    });

    it('should require Node.js >= 18', () => {
      const pkgPath = join(PROJECT_ROOT, 'package.json');
      const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));

      assert.ok(pkg.engines, 'Should have engines');
      assert.ok(pkg.engines.node, 'Should have node engine');
      assert.ok(pkg.engines.node.includes('18'), 'Should require Node.js 18');
    });
  });

  describe('init command behavior', () => {
    async function runInit(name) {
      const projectDir = join(testDir, name, 'project');
      const homeDir = join(testDir, name, 'home');

      mkdirSync(projectDir, { recursive: true });
      mkdirSync(homeDir, { recursive: true });

      const result = await execFileAsync('node', [FRIDAY_CLI, 'init'], {
        cwd: projectDir,
        env: { ...process.env, HOME: homeDir },
      });

      return { ...result, projectDir, homeDir };
    }

    it('should install commands, agents, templates, and context7 config', async () => {
      const { projectDir, homeDir } = await runInit('fresh-install');

      assert.ok(existsSync(join(homeDir, '.claude', 'CLAUDE.md')));
      assert.ok(existsSync(join(homeDir, '.claude', 'commands', firstCommandTemplate)));
      assert.ok(existsSync(join(homeDir, '.claude', 'agents', AGENT_FILES[0])));
      assert.ok(existsSync(join(projectDir, 'specs', firstSpecTemplate)));
      assert.ok(existsSync(join(projectDir, 'memory', firstMemoryTemplate)));

      const settings = JSON.parse(
        readFileSync(join(homeDir, '.claude', 'settings.local.json'), 'utf-8'),
      );
      assert.deepStrictEqual(settings.mcpServers.context7, {
        command: 'npx',
        args: ['-y', '@upstash/context7-mcp'],
      });
    });

    it('should preserve existing files on re-run', async () => {
      const name = 'rerun-skip';
      const firstRun = await runInit(name);
      const customSpecPath = join(firstRun.projectDir, 'specs', firstSpecTemplate);
      const customCommandPath = join(firstRun.homeDir, '.claude', 'commands', firstCommandTemplate);

      writeFileSync(customSpecPath, 'custom spec\n');
      writeFileSync(customCommandPath, 'custom command\n');

      const secondRun = await execFileAsync('node', [FRIDAY_CLI, 'init'], {
        cwd: firstRun.projectDir,
        env: { ...process.env, HOME: join(testDir, name, 'home') },
      });

      assert.ok(secondRun.stdout.includes(`skip specs/${firstSpecTemplate} (exists)`));
      assert.ok(secondRun.stdout.includes(`skip ${firstCommandTemplate} (exists)`));
      assert.strictEqual(readFileSync(customSpecPath, 'utf-8'), 'custom spec\n');
      assert.strictEqual(readFileSync(customCommandPath, 'utf-8'), 'custom command\n');
    });

    it('should refresh friday-managed files when requested', async () => {
      const name = 'refresh-mode';
      const firstRun = await runInit(name);
      const specPath = join(firstRun.projectDir, 'specs', firstSpecTemplate);
      const commandPath = join(firstRun.homeDir, '.claude', 'commands', firstCommandTemplate);
      const settingsPath = join(firstRun.homeDir, '.claude', 'settings.local.json');

      writeFileSync(specPath, 'stale spec\n');
      writeFileSync(commandPath, 'stale command\n');
      writeFileSync(
        settingsPath,
        JSON.stringify(
          {
            mcpServers: {
              context7: {
                command: 'node',
                args: ['custom-context7'],
              },
            },
          },
          null,
          2,
        ),
      );

      const { stdout } = await execFileAsync('node', [FRIDAY_CLI, 'init', '--refresh'], {
        cwd: firstRun.projectDir,
        env: { ...process.env, HOME: join(testDir, name, 'home') },
      });

      assert.ok(stdout.includes('refresh CLAUDE.md'));
      assert.ok(stdout.includes(`refresh ${firstCommandTemplate}`));
      assert.ok(stdout.includes(`refresh specs/${firstSpecTemplate}`));
      assert.ok(stdout.includes('context7 MCP refreshed'));
      assert.notStrictEqual(readFileSync(specPath, 'utf-8'), 'stale spec\n');
      assert.notStrictEqual(readFileSync(commandPath, 'utf-8'), 'stale command\n');

      const settings = JSON.parse(readFileSync(settingsPath, 'utf-8'));
      assert.deepStrictEqual(settings.mcpServers.context7, {
        command: 'npx',
        args: ['-y', '@upstash/context7-mcp'],
      });
    });

    it('should overwrite files with --force flag', async () => {
      const name = 'force-mode';
      const firstRun = await runInit(name);
      const specPath = join(firstRun.projectDir, 'specs', firstSpecTemplate);
      const commandPath = join(firstRun.homeDir, '.claude', 'commands', firstCommandTemplate);

      writeFileSync(specPath, 'old spec\n');
      writeFileSync(commandPath, 'old command\n');

      const { stdout } = await execFileAsync('node', [FRIDAY_CLI, 'init', '--force'], {
        cwd: firstRun.projectDir,
        env: { ...process.env, HOME: join(testDir, name, 'home') },
      });

      assert.ok(
        stdout.includes(`refresh specs/${firstSpecTemplate}`),
        'Should refresh spec template',
      );
      assert.ok(stdout.includes(`refresh ${firstCommandTemplate}`), 'Should refresh command');
      assert.notStrictEqual(
        readFileSync(specPath, 'utf-8'),
        'old spec\n',
        'Spec should be overwritten',
      );
      assert.notStrictEqual(
        readFileSync(commandPath, 'utf-8'),
        'old command\n',
        'Command should be overwritten',
      );
    });

    it('should remove deprecated commands during init', async () => {
      const name = 'remove-deprecated';
      const projectDir = join(testDir, name, 'project');
      const homeDir = join(testDir, name, 'home');
      const legacyCommandPath = join(homeDir, '.claude', 'commands', 'friday.md');

      mkdirSync(projectDir, { recursive: true });
      mkdirSync(join(homeDir, '.claude', 'commands'), { recursive: true });
      writeFileSync(legacyCommandPath, 'legacy command\n');

      const { stdout } = await execFileAsync('node', [FRIDAY_CLI, 'init'], {
        cwd: projectDir,
        env: { ...process.env, HOME: homeDir },
      });

      assert.ok(stdout.includes('remove friday.md'));
      assert.ok(!existsSync(legacyCommandPath));
    });

    it('should skip invalid settings.local.json without failing install', async () => {
      const name = 'invalid-settings';
      const projectDir = join(testDir, name, 'project');
      const homeDir = join(testDir, name, 'home');
      const settingsDir = join(homeDir, '.claude');
      const settingsPath = join(settingsDir, 'settings.local.json');

      mkdirSync(projectDir, { recursive: true });
      mkdirSync(settingsDir, { recursive: true });
      writeFileSync(settingsPath, '{invalid json\n');

      const { stdout } = await execFileAsync('node', [FRIDAY_CLI, 'init'], {
        cwd: projectDir,
        env: { ...process.env, HOME: homeDir },
      });

      assert.ok(stdout.includes('skip (invalid JSON in settings.local.json)'));
      assert.ok(existsSync(join(homeDir, '.claude', 'commands', firstCommandTemplate)));
      assert.strictEqual(readFileSync(settingsPath, 'utf-8'), '{invalid json\n');
    });
  });
});
