#!/usr/bin/env node

import { readFileSync } from 'node:fs';
import { renderAgentsLine, renderCommandSections } from '../src/catalog.js';
import { setup } from '../src/setup.js';

const packageJson = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf-8'));
const exitCode = await main(process.argv.slice(2));

if (exitCode !== 0) {
  process.exitCode = exitCode;
}

async function main(args) {
  const [command, ...rest] = args;

  if (!command) {
    showHelp();
    return 0;
  }

  if (command === 'init') {
    return runInit(rest);
  }

  if (command === '--help' || command === 'help') {
    return runStandalone(rest, () => showHelp(), command);
  }

  if (command === '--version' || command === '-v') {
    return runStandalone(rest, () => console.log(packageJson.version), command);
  }

  return fail(`Unknown command: ${command}`);
}

async function runInit(args) {
  const validFlags = ['--refresh', '--force'];
  const unknownFlags = args.filter((arg) => !validFlags.includes(arg));

  if (unknownFlags.length > 0) {
    return fail(`Unknown flag for init: ${unknownFlags[0]}`);
  }

  await setup({ refresh: args.includes('--refresh') || args.includes('--force') });
  return 0;
}

function runStandalone(args, action, command) {
  if (args.length > 0) {
    return fail(`Unexpected arguments for ${command}: ${args.join(' ')}`);
  }

  action();
  return 0;
}

function fail(message) {
  console.error(`Error: ${message}`);
  console.error('Run `npx friday --help` for usage.');
  return 1;
}

function showHelp() {
  console.log([
    'friday — one-click dev workflow',
    '',
    'Usage:',
    '  npx friday init              Set up workflow in current project',
    '  npx friday init --force      Overwrite all friday-managed files',
    '  npx friday --help            Show this help',
    '  npx friday --version         Show CLI version',
    '',
    'Commands available after init:',
    '',
    renderCommandSections(),
    '',
    renderAgentsLine(),
    '',
    'Notes:',
    '  friday commands run independently, but may recommend next steps in the workflow.',
    '  Existing files are preserved by default. Use --force to overwrite friday-managed files.',
  ].join('\n'));
}
