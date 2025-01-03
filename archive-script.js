/** 
 * The post-build packaging process that makes the package ready for upload.
 * 
 * @author Pihedy
 */

const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

const distFolder = path.resolve(__dirname, 'dist');
const buildFolder = path.resolve(__dirname, 'build');
const outputZip = path.join(buildFolder, 'dist.zip');

if (!fs.existsSync(buildFolder)) {
    fs.mkdirSync(buildFolder);
}

const Output = fs.createWriteStream(outputZip);
const Archive = archiver('zip', {
    zlib: { level: 9 }
});

Output.on('close', () => {
    console.log(`Zip file created: ${outputZip} (${Archive.pointer()} bytes)`);
});

Archive.on('error', (err) => {
    throw err;
});

const excludedFiles = ['.gitkeep', 'styles.js'];

/**
 * Recursively adds files from the specified directory to the given Archiver instance.
 *
 * @param {string} dir - The directory path to add files from.
 * @param {archiver} Archive - The Archiver instance to add files to.
 * @param {string} [base=''] - The base path to use for relative file paths.
 */
function addFilesToArchive(dir, Archive, base = '') {
    const files = fs.readdirSync(dir);

    files.forEach((file) => {
        const filePath = path.join(dir, file);
        const relativePath = path.join(base, file);

        if (excludedFiles.includes(file)) {
            return;
        }

        if (fs.lstatSync(filePath).isDirectory()) {
            addFilesToArchive(filePath, Archive, relativePath);

            return;
        }

        Archive.file(filePath, { name: relativePath });
    });
}

Archive.pipe(Output);

addFilesToArchive(distFolder, Archive);

Archive.finalize();
