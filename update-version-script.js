/** 
 * This script updates the version in the manifest.json file.
 * 
 * @author Pihedy
 */

const fs = require('fs');
const path = require('path');

const manifestJsonPath = path.join(__dirname, 'public/manifest.json');

const packageData = JSON.parse(fs.readFileSync(
    path.join(__dirname, 'package.json'), 
    'utf8')
);

const version = packageData.version;

const manifestData = JSON.parse(fs.readFileSync(manifestJsonPath, 'utf8'));
manifestData.version = version;

fs.writeFileSync(manifestJsonPath, JSON.stringify(manifestData, null, 2), 'utf8');
fs.appendFileSync(manifestJsonPath, '\n', 'utf8');

console.log(`Manifest version updated: ${version}`);
