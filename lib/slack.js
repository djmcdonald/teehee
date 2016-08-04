'use strict';

var Slack = require('node-slack'),
    options = {},
    proxy = process.env.http_proxy,
    slack;

if (proxy) {
    options.proxy = proxy;
}

module.exports = function (url) {
    slack = new Slack(url, options);

    return function (msg) {
        return new Promise(function (resolve) {
            slack.send({
                text: msg,
                username: 'hack-bot'
            }, function () {
                resolve();
            });
        });
    }
};
