/**
 * Auto-Deploy Watcher
 * Watches for CMS file changes and auto-pushes to GitHub.
 * When Sveltia CMS saves a file, this detects it, waits a few seconds
 * for all saves to finish, then commits and pushes to origin/main.
 */

const { watch } = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DEBOUNCE_MS = 4000; // Wait 4 seconds after last change before pushing

// Directories the CMS writes to
const WATCH_DIRS = [
  'src/_data',
  'src/timeline',
  'src/games',
  'src/updates',
  'src/images',
];

let timer = null;
let changedFiles = new Set();

function deploy() {
  const files = [...changedFiles];
  changedFiles.clear();

  try {
    // Check if there are actually staged/unstaged changes
    const status = execSync('git status --porcelain src/', { cwd: ROOT }).toString().trim();
    if (!status) {
      console.log('[auto-deploy] No changes to deploy.');
      return;
    }

    console.log(`[auto-deploy] Deploying changes...`);
    execSync('git add src/', { cwd: ROOT, stdio: 'inherit' });
    execSync(`git commit -m "Content update via CMS"`, { cwd: ROOT, stdio: 'inherit' });
    execSync('git push origin main', { cwd: ROOT, stdio: 'inherit' });
    console.log('[auto-deploy] Pushed to GitHub. Cloudflare will rebuild the live site.');
  } catch (err) {
    console.error('[auto-deploy] Deploy failed:', err.message);
  }
}

function onFileChange(dir, eventType, filename) {
  if (!filename) return;
  // Ignore hidden files and _site output
  if (filename.startsWith('.') || filename.startsWith('_site')) return;

  const fullPath = path.join(dir, filename);
  changedFiles.add(fullPath);
  console.log(`[auto-deploy] Detected change: ${fullPath}`);

  // Reset the debounce timer
  if (timer) clearTimeout(timer);
  timer = setTimeout(deploy, DEBOUNCE_MS);
}

// Start watching
console.log('[auto-deploy] Watching for CMS changes...');
console.log('[auto-deploy] Changes will auto-push to GitHub → Cloudflare rebuilds the live site.');
console.log('');

for (const dir of WATCH_DIRS) {
  const fullDir = path.join(ROOT, dir);
  try {
    watch(fullDir, { recursive: true }, (eventType, filename) => {
      onFileChange(dir, eventType, filename);
    });
    console.log(`  Watching: ${dir}/`);
  } catch (err) {
    // Directory might not exist yet, that's OK
    console.log(`  Skipped:  ${dir}/ (not found)`);
  }
}

console.log('');
console.log('Edit in the CMS → save → changes auto-deploy in ~5 seconds.');
console.log('Press Ctrl+C to stop.\n');
