module.exports = {
    log: {
        console: {
            enabled: true,
            level: 'debug',
            colorize: false
        },
        plaintext: {
            enabled: true,
            level: 'debug',
            filename: 'app.log',
            dirname: 'logs',
            maxsize: 10485760
        },
        audit: {
            enabled: true,
            level: 'audit',
            filename: 'app.log',
            dirname: 'logs',
            maxsize: 10485760
        }
    },
    connectorUrl: "http://localhost:3000/rest/user/neps",
    couchBase: {
        server: 'localhost:8091',
        bucketName: 'bodyBuilding',
        bucketPassword: 'star_2828'
    }
}