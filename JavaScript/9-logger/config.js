'use strict';

const Transport = {
    http: 'http',
    ws: 'ws',
};

module.exports = {
    api: {
        port: 8001,
        host: '127.0.0.1',
        transport: Transport.http,
    },
    static: {
        port: 8000,
    },
    db: {
        host: '127.0.0.1',
        port: 5432,
        database: 'example',
        user: 'marcus',
        password: 'marcus',
    },
    crypto: {
        saltLenght: 16,
        keyLenght: 64,
        encoding: 'base64',
    },
};
