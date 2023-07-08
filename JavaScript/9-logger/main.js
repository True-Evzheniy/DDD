'use strict';

const config = require('./config.js');
const fsp = require('node:fs').promises;
const path = require('node:path');
const server = require(`./${config.api.transport}.js`);
const staticServer = require('./static.js');
const load = require('./load.js');
const db = require('./db.js')(config.db);
const hash = require('./hash.js');
const logger = require('./logger.js');
const buildStaic = require('./render.js');

const sandbox = {
  console: Object.freeze(logger),
  db: Object.freeze(db),
  common: { hash },
};
const cwd = process.cwd();
const apiPath = path.join(cwd, './api');
const templatePath = path.join(cwd, './templates');
const staticPath = path.join(cwd, './static');
const templateData = {apiUrl: `${config.api.transport}://${config.api.host}:${config.api.port}`};
const routing = {};

(async () => {
  await buildStaic(templatePath, staticPath, templateData);
  const files = await fsp.readdir(apiPath);
  for (const fileName of files) {
    if (!fileName.endsWith('.js')) continue;
    const filePath = path.join(apiPath, fileName);
    const serviceName = path.basename(fileName, '.js');
    routing[serviceName] = await load(filePath, sandbox);
  }

  staticServer('./static', config.static.port);
  server(routing, config.api.port);
})();
