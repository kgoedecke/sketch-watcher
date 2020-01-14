const cp = require('child_process');
const path = require('path');
const fs = require('fs-extra');
const { promisify } = require('util');

const exec = promisify(cp.exec);

const INPUT_FILE = process.argv.slice(2).pop();
const UNZIP_DIR = INPUT_FILE.split('.').slice(0, -1).join('.');

const unzipSketchFile = (source, targetDir) => {
  exec(`unzip -o "${source}" -d "${targetDir}"`)
};

fs.watch(INPUT_FILE, { encoding: 'utf8' }, (eventType, filename) => {
  if (filename) {
    console.log(`💎 Sketch File Changed: ${filename}`);
    unzipSketchFile(INPUT_FILE, UNZIP_DIR);
    console.log(`✅ Unzipped to: ${path.resolve(UNZIP_DIR)}`);
  }
});
