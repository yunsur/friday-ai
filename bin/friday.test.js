import { describe, it } from 'node:test';
import assert from 'node:assert';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { readFileSync } from 'node:fs';
import { AGENT_NAMES, COMMAND_SECTIONS } from '../src/catalog.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const FRIDAY_CLI = join(__dirname, 'friday.js');
const PACKAGE_JSON = JSON.parse(readFileSync(join(__dirname, '..', 'package.json'), 'utf-8'));
const FLAT_COMMANDS = COMMAND_SECTIONS.flatMap((section) => section.commands);
const QUICK_ACTION_COMMANDS = COMMAND_SECTIONS[0].commands;
const MEMORY_COMMANDS = COMMAND_SECTIONS[1].commands;
const KNOWLEDGE_GUIDE_COMMANDS = COMMAND_SECTIONS[2].commands;
const FULL_WORKFLOW_COMMANDS = COMMAND_SECTIONS[3].commands;

const execFileAsync = promisify(execFile);

describe('friday CLI', () => {
  async function runCli(args = []) {
    try {
      const result = await execFileAsync('node', [FRIDAY_CLI, ...args]);
      return { ...result, code: 0 };
    } catch (error) {
      return {
        stdout: error.stdout ?? '',
        stderr: error.stderr ?? '',
        code: error.code ?? 1,
      };
    }
  }

  it('should show help when no arguments', async () => {
    const { stdout, code } = await runCli();

    assert.strictEqual(code, 0, 'Should exit successfully');
    assert.ok(stdout.includes('friday'), 'Should show friday name');
    assert.ok(stdout.includes('Commands available'), 'Should show commands section');
    assert.ok(stdout.includes('npx friday init --force'), 'Should document force mode');
    assert.ok(stdout.includes('npx friday --version'), 'Should document version flag');
    assert.ok(!stdout.includes('/friday              Auto-detect intent and route to the right skill'), 'Should not list removed root command');

    for (const command of FLAT_COMMANDS) {
      assert.ok(stdout.includes(`/${command.name}`), `Should list ${command.name}`);
    }
  });

  it('should show help with --help', async () => {
    const { stdout, code } = await runCli(['--help']);

    assert.strictEqual(code, 0, 'Should exit successfully');
    assert.ok(stdout.includes('npx friday init'), 'Should show init usage');
    assert.ok(stdout.includes('npx friday init --force'), 'Should show force usage');
    assert.ok(stdout.includes('Knowledge guides'), 'Should show knowledge guides section');
  });

  it('should show version with --version', async () => {
    const { stdout, code } = await runCli(['--version']);

    assert.strictEqual(code, 0, 'Should exit successfully');
    assert.strictEqual(stdout.trim(), PACKAGE_JSON.version, 'Should print package version');
  });

  it('should show version with -v', async () => {
    const { stdout, code } = await runCli(['-v']);

    assert.strictEqual(code, 0, 'Should exit successfully');
    assert.strictEqual(stdout.trim(), PACKAGE_JSON.version, 'Should print package version');
  });

  it('should show all quick actions', async () => {
    const { stdout } = await runCli();

    for (const command of QUICK_ACTION_COMMANDS) {
      assert.ok(stdout.includes(`/${command.name}`), `Should list ${command.name}`);
    }
  });

  it('should show all full workflow commands', async () => {
    const { stdout } = await runCli();

    for (const command of FULL_WORKFLOW_COMMANDS) {
      assert.ok(stdout.includes(`/${command.name}`), `Should list ${command.name}`);
    }
  });

  it('should show memory and discovery commands', async () => {
    const { stdout } = await runCli();

    for (const command of MEMORY_COMMANDS) {
      assert.ok(stdout.includes(`/${command.name}`), `Should list ${command.name}`);
    }
  });

  it('should show architecture commands', async () => {
    const { stdout } = await runCli();

    assert.ok(stdout.includes('Knowledge guides'), 'Should group guide commands');

    for (const command of KNOWLEDGE_GUIDE_COMMANDS) {
      assert.ok(stdout.includes(`/${command.name}`), `Should list ${command.name}`);
    }
  });

  it('should show agents', async () => {
    const { stdout } = await runCli();

    for (const agent of AGENT_NAMES) {
      assert.ok(stdout.includes(agent), `Should list ${agent} agent`);
    }
  });

  it('should fail on unknown commands', async () => {
    const { stderr, code } = await runCli(['nope']);

    assert.strictEqual(code, 1, 'Should exit with failure');
    assert.ok(stderr.includes('Unknown command: nope'), 'Should explain unknown command');
  });

  it('should fail on unknown init flags', async () => {
    const { stderr, code } = await runCli(['init', '--bad']);

    assert.strictEqual(code, 1, 'Should exit with failure');
    assert.ok(stderr.includes('Unknown flag for init: --bad'), 'Should explain invalid init flag');
  });
});
