import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const packageJsonPath = join(ROOT, 'package.json');
const claudePluginPath = join(ROOT, '.claude-plugin', 'plugin.json');
const claudeMarketplacePath = join(ROOT, '.claude-plugin', 'marketplace.json');
const codexPluginPath = join(ROOT, '.codex-plugin', 'plugin.json');

const packageJson = readJson(packageJsonPath);

const metadata = {
  version: packageJson.version,
  author: packageJson.author,
  homepage: packageJson.homepage,
  repository: packageJson.repository,
  publisherName: packageJson.author.name,
};

const claudePlugin = readJson(claudePluginPath);
claudePlugin.version = metadata.version;
claudePlugin.author = metadata.author;
claudePlugin.homepage = metadata.homepage;
claudePlugin.repository = metadata.repository;
writeJson(claudePluginPath, claudePlugin);

const claudeMarketplace = readJson(claudeMarketplacePath);
claudeMarketplace.name = metadata.publisherName;
claudeMarketplace.owner = metadata.author;
claudeMarketplace.plugins[0].version = metadata.version;
claudeMarketplace.plugins[0].author = metadata.author;
writeJson(claudeMarketplacePath, claudeMarketplace);

const codexPlugin = readJson(codexPluginPath);
codexPlugin.version = metadata.version;
codexPlugin.author = metadata.author;
codexPlugin.homepage = metadata.homepage;
codexPlugin.repository = metadata.repository;
codexPlugin.interface.developerName = metadata.publisherName;
codexPlugin.interface.websiteURL = metadata.homepage;
writeJson(codexPluginPath, codexPlugin);

console.log(`Synced metadata for version ${metadata.version}`);

function readJson(path) {
  return JSON.parse(readFileSync(path, 'utf-8'));
}

function writeJson(path, value) {
  writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`);
}
