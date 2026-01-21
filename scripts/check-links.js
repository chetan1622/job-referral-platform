const fs = require('fs');
const path = require('path');

function getAllFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);

    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function (file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            if (file !== 'node_modules' && file !== '.next' && file !== '.git') {
                arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
            }
        } else {
            arrayOfFiles.push(path.join(dirPath, "/", file));
        }
    });

    return arrayOfFiles;
}

const files = getAllFiles('.');
const urlRegex = /https?:\/\/[^\s"',]+/g;

console.log('Scanning for links...');

files.forEach(file => {
    try {
        const content = fs.readFileSync(file, 'utf8');
        const matches = content.match(urlRegex);
        if (matches) {
            matches.forEach(url => {
                // Ignore common schemas or external libs if needed, but for now allow all
                // identifying specifically if it looks like our old netlify app
                if (url.includes('netlify.app') || url.includes('github.com')) {
                    console.log(`[WARNING] Found sensitive/old link in ${file}: ${url}`);
                } else {
                    // console.log(`[INFO] Found link in ${file}: ${url}`);
                }
            });
        }
    } catch (err) {
        // ignore binary files
    }
});

console.log('Scan complete.');
