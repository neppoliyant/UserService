module.exports = {
    log: {
        console: {
            enabled: true,
            level: 'debug',
            colorize: false
        },
        plaintext: {
            enabled: false,
            level: 'debug',
            filename: 'app.log',
            dirname: 'logs',
            maxsize: 10485760
        },
        audit: {
            enabled: true,
            level: 'audit',
            filename: 'appAudit.log',
            dirname: 'logs',
            maxsize: 10485760
        }
    },
    serviceUrl : "http://96.119.5.107:3000/rest/",
    dir: "/opt/props/bodyBuilding/",
    connectorUrl: "http://96.119.5.107:3000/rest/user/neps",
    swaggerBaseUrl: "http://96.119.5.107:3000/rest",
    swaggerDocUrl: "http://96.119.5.107:3000",
    couchBase: {
        server: 'http://96.119.5.126/:8091',
        bucketName: 'webrtc-registrar-dev',
        bucketPassword: 'webrtc'
    }
}
