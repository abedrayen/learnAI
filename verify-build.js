#!/usr/bin/env node

/**
 * Verification script to ensure build output is correct
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.join(__dirname, 'dist');
const distIndex = path.join(distDir, 'index.html');
const assetsDir = path.join(distDir, 'assets');

console.log('🔍 Verifying build output...\n');

// Check if dist directory exists
if (!fs.existsSync(distDir)) {
  console.error('❌ dist/ directory not found! Run npm run build first.');
  process.exit(1);
}

// Check if index.html exists
if (!fs.existsSync(distIndex)) {
  console.error('❌ dist/index.html not found!');
  process.exit(1);
}

// Check if assets directory exists
if (!fs.existsSync(assetsDir)) {
  console.error('❌ dist/assets/ directory not found!');
  process.exit(1);
}

// Read index.html and check for script reference
const indexContent = fs.readFileSync(distIndex, 'utf-8');

// Check for script tag
if (!indexContent.includes('<script')) {
  console.error('❌ index.html missing script tag!');
  process.exit(1);
}

// Check for game-container
if (!indexContent.includes('game-container')) {
  console.error('❌ index.html missing game-container div!');
  process.exit(1);
}

// Check for assets
const assets = fs.readdirSync(assetsDir);
const jsFiles = assets.filter(f => f.endsWith('.js'));

if (jsFiles.length === 0) {
  console.error('❌ No JavaScript files found in dist/assets/!');
  process.exit(1);
}

// Verify script reference matches actual file
const scriptMatch = indexContent.match(/src="\.\/assets\/([^"]+)"/);
if (scriptMatch) {
  const referencedFile = scriptMatch[1];
  const fileExists = fs.existsSync(path.join(assetsDir, referencedFile));
  
  if (!fileExists) {
    console.error(`❌ index.html references ${referencedFile} but file doesn't exist!`);
    process.exit(1);
  }
  
  console.log(`✅ Script reference matches: ${referencedFile}`);
} else {
  console.warn('⚠️  Could not verify script reference in index.html');
}

console.log('\n✅ Build verification passed!');
console.log(`📦 Build output:`);
console.log(`   - index.html: ${fs.statSync(distIndex).size} bytes`);
console.log(`   - JavaScript bundle: ${jsFiles.map(f => {
  const filePath = path.join(assetsDir, f);
  return `${f} (${(fs.statSync(filePath).size / 1024).toFixed(2)} KB)`;
}).join(', ')}`);
console.log('\n🚀 Ready to deploy! Upload the entire dist/ folder to your hosting service.');

