import { existsSync, mkdirSync, readFileSync, unlinkSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { homedir } from 'node:os';
import { AGENT_FILES, CORE_COMMANDS, DEPRECATED_COMMANDS, MEMORY_TEMPLATES, SPEC_TEMPLATES, renderAgentsLine, renderCommandSections } from './catalog.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const TEMPLATES = join(__dirname, '..', 'templates');

// Global install path: ~/.claude/
const CLAUDE_DIR = join(homedir(), '.claude');

export async function setup(options = {}) {
  const { refresh = false } = options;

  console.log('friday — installing globally to ~/.claude/\n');

  // 1. Copy CLAUDE.md to ~/.claude/CLAUDE.md
  copyToGlobal('CLAUDE.md', 'CLAUDE.md', { refresh });

  // 2. Remove commands that are no longer shipped
  removeDeprecatedCommands();

  // 3. Copy core commands to ~/.claude/commands/
  copyCoreCommands({ refresh });

  // 4. Copy agent definitions to ~/.claude/agents/
  copyAgents({ refresh });

  // 5. Copy spec templates to current project (./specs/)
  copySpecTemplates({ refresh });

  // 6. Copy memory templates to current project (./memory/)
  copyMemoryTemplates({ refresh });

  // 7. Setup Context7 MCP config to ~/.claude/settings.local.json
  setupContext7({ refresh });

  console.log('\n✅ Done. Globally available:');
  console.log(renderCommandSections({ sectionIndent: '   ', commandIndent: '     ' }));
  console.log(renderAgentsLine('   '));
  console.log('\n   Spec templates copied to ./specs/');
  console.log('   Memory templates copied to ./memory/');
}

function removeDeprecatedCommands() {
  const commandsDir = join(CLAUDE_DIR, 'commands');

  for (const file of DEPRECATED_COMMANDS) {
    const filePath = join(commandsDir, file);

    if (!existsSync(filePath)) {
      continue;
    }

    unlinkSync(filePath);
    console.log(`   remove ${file}`);
  }
}

function copyToGlobal(src, destRelative, { refresh = false } = {}) {
  const srcPath = join(TEMPLATES, src);
  const destPath = join(CLAUDE_DIR, destRelative);
  const displayPath = destRelative;

  if (existsSync(destPath) && !refresh) {
    console.log(`   skip ${displayPath} (exists)`);
    return;
  }

  const action = existsSync(destPath) ? 'refresh' : 'install';
  const content = readFileSync(srcPath, 'utf-8');
  mkdirSync(dirname(destPath), { recursive: true });
  writeFileSync(destPath, content);
  console.log(`   ${action} ${displayPath}`);
}

function copySpecTemplates({ refresh = false } = {}) {
  copyFiles({
    title: '\n📄 Copying spec templates to current project...',
    srcDir: join(TEMPLATES, 'specs'),
    destDir: 'specs',
    files: SPEC_TEMPLATES,
    action: 'copy',
    displayPath: (file) => `specs/${file}`,
    refresh,
  });
}

function copyMemoryTemplates({ refresh = false } = {}) {
  copyFiles({
    title: '\n🧠 Copying memory templates to current project...',
    srcDir: join(TEMPLATES, 'memory'),
    destDir: 'memory',
    files: MEMORY_TEMPLATES,
    action: 'copy',
    displayPath: (file) => `memory/${file}`,
    refresh,
  });
}

function copyCoreCommands({ refresh = false } = {}) {
  copyFiles({
    title: '\n⚡ Installing commands to ~/.claude/commands/...',
    srcDir: join(TEMPLATES, 'commands'),
    destDir: join(CLAUDE_DIR, 'commands'),
    files: CORE_COMMANDS,
    action: 'install',
    refresh,
  });
}

function copyAgents({ refresh = false } = {}) {
  copyFiles({
    title: '\n🤖 Installing agents to ~/.claude/agents/...',
    srcDir: join(TEMPLATES, 'agents'),
    destDir: join(CLAUDE_DIR, 'agents'),
    files: AGENT_FILES,
    action: 'install',
    refresh,
  });
}

function copyFiles({ title, srcDir, destDir, files, action, displayPath = (file) => file, refresh = false }) {
  console.log(title);
  mkdirSync(destDir, { recursive: true });

  for (const file of files) {
    const srcPath = join(srcDir, file);
    const destPath = join(destDir, file);
    const display = displayPath(file);

    if (existsSync(destPath) && !refresh) {
      console.log(`   skip ${display} (exists)`);
      continue;
    }

    const logAction = existsSync(destPath) ? 'refresh' : action;
    const content = readFileSync(srcPath, 'utf-8');
    writeFileSync(destPath, content);
    console.log(`   ${logAction} ${display}`);
  }
}

function setupContext7({ refresh = false } = {}) {
  console.log('\n🔗 Setting up Context7 MCP...');

  const configPath = join(CLAUDE_DIR, 'settings.local.json');

  let config = {};
  if (existsSync(configPath)) {
    try {
      config = JSON.parse(readFileSync(configPath, 'utf-8'));
    } catch {
      console.log('   skip (invalid JSON in settings.local.json)');
      return;
    }
  }

  if (config.mcpServers?.context7 && !refresh) {
    console.log('   skip (context7 already configured)');
    return;
  }

  config.mcpServers = config.mcpServers || {};
  config.mcpServers.context7 = {
    command: 'npx',
    args: ['-y', '@upstash/context7-mcp'],
  };

  mkdirSync(dirname(configPath), { recursive: true });
  writeFileSync(configPath, JSON.stringify(config, null, 2) + '\n');
  console.log(refresh ? '   context7 MCP refreshed' : '   context7 MCP configured');
}
