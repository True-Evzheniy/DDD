const fsp = require('node:fs').promises;
const path = require('node:path');
const load = require('./load.js');

module.exports = async (sourceDirPath, resultDirPath, context) => {
  const templates = await fsp.readdir(sourceDirPath);
  for (const templateName of templates) {
    const templateFilePath = path.join(sourceDirPath, templateName)
    const data = await load(templateFilePath, context);
    const fileName = path.basename(templateFilePath, '.js');
    const filePath = path.join(resultDirPath, fileName);
    try {
      await fsp.access(filePath);
      await fsp.unlink(filePath);
    } finally {
      await fsp.writeFile(filePath, data);
    }
  }
};
