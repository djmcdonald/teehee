'use strict';

var request = require('request'),
    readFileSync = require('fs').readFileSync,
    jenkinsProject,
    jenkinsHost,
    options = {};

module.exports = {
    setup: function (host, project, ca, cert, key) {
        options = {
            cert: readFileSync(cert),
            key: readFileSync(key),
            ca: readFileSync(ca),
            json: true
        };

        jenkinsHost = host;
        jenkinsProject = project;
    },
    get: function () {
        return new Promise(function (resolve, reject) {
            options.url = jenkinsHost + '/job/' + jenkinsProject + '/api/json';

            request.get(options, function (err, res, body) {
                if (err) {
                    reject(err);
                } else {
                    if (res.statusCode !== 200) {
                        reject({ error: res.statusCode });
                    } else {
                        resolve({
                            success: body.color === 'blue',
                            lastBuild: body.lastBuild.number
                        });
                    }
                }
            });
        });
    }
};
