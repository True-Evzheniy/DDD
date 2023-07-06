const Transport = {
    http: './http.js',
    ws: './ws.js',
};

module.exports = {
    staticServerPort: 8000,
    apiServerPort: 8001,
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
    transport: Transport.http,
};