const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const packageJsonPath = path.join(rootDir, 'package.json');
const distPackageJsonPath = path.join(distDir, 'package.json');

// Ensure dist directory exists
if (!fs.existsSync(distDir)) {
    console.error('Dist directory does not exist. Run build first.');
    process.exit(1);
}

// Read original package.json
const packageJson = require(packageJsonPath);

// Create a copy for distribution
const distPackageJson = { ...packageJson };

// Remove devDependencies
delete distPackageJson.devDependencies;
delete distPackageJson.scripts; // Scripts are usually not needed in the published package
delete distPackageJson.files; // We are in the dist folder, so we want to publish everything in it

// Adjust paths
// Since we are moving package.json inside dist/, we need to remove 'dist/' or 'kyd/' prefix from paths 
// if they were pointing to files that are now relative to the new package.json location.
// However, tsup output structure is flat inside dist (or whatever structure it creates).
// Let's look at previous package.json:
// "main": "./kyd/index.js" -> effectively "index.js" if package.json is in kyd/ (which was dist/)

// The previous output dir was 'kyd', so the paths were relative to project root.
// Now output dir is 'dist'. We want package.json INSIDE 'dist'.
// So "main" should point to "index.js" (which is inside dist).

distPackageJson.main = './index.js';
distPackageJson.module = './index.mjs';
distPackageJson.types = './index.d.ts';

// Handle exports
// Original:
// "exports": {
//    ".": { ... "./kyd/index.js" },
//    "./Button": { ... "./kyd/Button/index.js" }
// }
// New (inside dist):
// "exports": {
//    ".": { ... "./index.js" },
//    "./Button": { ... "./Button/index.js" }
// }

// Update exports
const newExports = {
    ".": {
        "types": "./index.d.ts",
        "import": "./index.mjs",
        "require": "./index.js"
    }
};

const components = ['Button', 'Checkbox', 'Input', 'Nav', 'Table'];

components.forEach(component => {
    newExports[`./${component}`] = {
        "types": `./${component}/index.d.ts`,
        "import": `./${component}/index.mjs`,
        "require": `./${component}/index.js`
    };
});

distPackageJson.exports = newExports;

// Write new package.json to dist
fs.writeFileSync(distPackageJsonPath, JSON.stringify(distPackageJson, null, 2));

// Copy README and LICENSE if they exist
const filesToCopy = ['README.md', 'LICENSE'];
filesToCopy.forEach(file => {
    const src = path.join(rootDir, file);
    if (fs.existsSync(src)) {
        fs.copyFileSync(src, path.join(distDir, file));
    }
});

// Generate clean index files
// Generate clean index files

const indexJsContent = components.map(c => `export * from './${c}/index.js';`).join('\n');
const indexMjsContent = components.map(c => `export * from './${c}/index.mjs';`).join('\n');
const indexDtsContent = components.map(c => `export * from './${c}/index';`).join('\n');

fs.writeFileSync(path.join(distDir, 'index.js'), indexJsContent);
fs.writeFileSync(path.join(distDir, 'index.mjs'), indexMjsContent);
fs.writeFileSync(path.join(distDir, 'index.d.ts'), indexDtsContent);
fs.writeFileSync(path.join(distDir, 'index.d.mts'), indexDtsContent);

console.log('Clean package.json and index files created in dist/');
console.log('You can now run "npm publish" inside the dist/ directory.');
