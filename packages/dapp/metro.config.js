// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('@expo/metro-config');

const path = require('path');
const projectRoot = __dirname;
const defaultConfig = getDefaultConfig(projectRoot);
const monorepoRoot = path.resolve(projectRoot, '../..');
defaultConfig.watchFolders.push(monorepoRoot);

defaultConfig.resolver.nodeModulesPaths = [
  path.resolve(monorepoRoot, 'node_modules'),
  path.resolve(projectRoot, 'node_modules'),
];

defaultConfig.resolver.sourceExts.push('cjs');

module.exports = defaultConfig;
