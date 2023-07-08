'use strict';

const crypto = require('node:crypto');
const {crypto: config} = require('./config.js');

const hash = (password) => new Promise((resolve, reject) => {
  const salt = crypto.randomBytes(config.saltLenght).toString('base64');
  crypto.scrypt(password, salt, config.keyLenght, (err, result) => {
    if (err) reject(err);
    resolve(salt + ':' + result.toString(config.encoding));
  });
});

module.exports = hash;
