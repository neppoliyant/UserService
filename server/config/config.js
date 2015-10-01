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
    dir: "/Users/nthang003c/opt/props/bodyBuilding/",
    connectorUrl: "http://96.119.5.107:3000/rest/user/neps",
    swaggerBaseUrl: "http://96.119.5.107:3000/rest",
    swaggerDocUrl: "http://96.119.5.107:3000",
    couchBase: {
        server: 'localhost:8091',
        bucketName: 'bodyBuilding',
        bucketPassword: 'star_2828'
    }
}