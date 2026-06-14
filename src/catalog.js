export const COMMAND_KIND_TITLES = {
  'quick-action': 'Quick actions (standalone, no full workflow needed)',
  'memory-discovery': 'Memory & Discovery',
  'knowledge-guide': 'Knowledge guides',
  workflow: 'Full workflow',
};

export const COMMAND_KIND_ORDER = [
  'quick-action',
  'memory-discovery',
  'knowledge-guide',
  'workflow',
];

export const COMMANDS = [
  { name: 'friday:hotfix', description: 'Quick bug fix', kind: 'quick-action' },
  { name: 'friday:tweak', description: 'Small change', kind: 'quick-action' },
  { name: 'friday:debug', description: 'Systematic debugging', kind: 'quick-action' },
  { name: 'friday:tdd', description: 'Test-driven development', kind: 'quick-action' },
  { name: 'friday:simplify', description: 'Code simplification', kind: 'quick-action' },
  { name: 'friday:security', description: 'Security review', kind: 'quick-action' },
  {
    name: 'friday:memory',
    description: 'View and manage project memory',
    kind: 'memory-discovery',
  },
  {
    name: 'friday:find-skill',
    description: 'Search and discover available skills',
    kind: 'memory-discovery',
  },
  { name: 'friday:api', description: 'API design patterns', kind: 'knowledge-guide' },
  {
    name: 'friday:frontend',
    description: 'Frontend development patterns',
    kind: 'knowledge-guide',
  },
  { name: 'friday:backend', description: 'Backend development patterns', kind: 'knowledge-guide' },
  {
    name: 'friday:deploy',
    description: 'Deployment workflows and CI/CD patterns',
    kind: 'knowledge-guide',
  },
  { name: 'friday:brainstorm', description: 'Turn ideas into designs', kind: 'workflow' },
  { name: 'friday:spec', description: 'Write structured spec', kind: 'workflow' },
  { name: 'friday:plan', description: 'Break spec into tasks', kind: 'workflow' },
  { name: 'friday:gen', description: 'Generate code', kind: 'workflow' },
  { name: 'friday:review', description: 'Review code against a spec', kind: 'workflow' },
  { name: 'friday:verify', description: 'Verify requirement coverage', kind: 'workflow' },
  { name: 'friday:commit', description: 'One-click commit', kind: 'workflow' },
];

export const COMMAND_SECTIONS = COMMAND_KIND_ORDER.map((kind) => ({
  title: COMMAND_KIND_TITLES[kind],
  commands: COMMANDS.filter((command) => command.kind === kind).map(({ name, description }) => ({
    name,
    description,
  })),
}));

export const CORE_COMMANDS = COMMANDS.map((command) => `${command.name}.md`);

export const AGENT_NAMES = ['architect', 'developer', 'tester'];
export const AGENT_FILES = AGENT_NAMES.map((name) => `${name}.md`);

export const SPEC_TEMPLATES = ['feature.md', 'api.md', 'schema.md', 'architecture.md'];
export const MEMORY_TEMPLATES = [
  'INDEX.md',
  '_example-decision.md',
  '_example-preference.md',
  '_example-pattern.md',
];
export const DEPRECATED_COMMANDS = ['friday.md'];

export function renderCommandSections({ sectionIndent = '  ', commandIndent = '    ' } = {}) {
  return COMMAND_SECTIONS.map((section) => {
    const lines = [`${sectionIndent}${section.title}:`];

    for (const command of section.commands) {
      const label = `/${command.name}`.padEnd(21);
      lines.push(`${commandIndent}${label} ${command.description}`);
    }

    return lines.join('\n');
  }).join('\n\n');
}

export function renderAgentsLine(indent = '  ') {
  return `${indent}Agents: ${AGENT_NAMES.join(', ')}`;
}
