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
    serviceUrl : "http://localhost:3001/rest/",
    dir: "/opt/props/bodyBuilding/",
    connectorUrl: "http://localhost:3001/rest/user/neps",
    swaggerBaseUrl: "http://localhost:3001/rest",
    swaggerDocUrl: "http://localhost:3001",
    couchBase: {
        server: 'http://localhost:8091',
        bucketName: 'bodybuilding',
        bucketPassword: 'webrtc',
        msgBucketName: 'bodybuildingProfile',
        msgBucketPassword: 'webrtc'
    },
    couchBaseLocal: {
        server: 'http://localhost/:8091',
        bucketName: 'bodyBuilding',
        bucketPassword: 'star_2828',
        msgBucketName: 'bodyBuilding',
        msgBucketPassword: 'star_2828'
    }
}
