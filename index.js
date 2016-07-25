'use strict';

var argv = require('minimist')(process.argv.slice(2)),
    includes = require('lodash/includes'),
    jenkins = require('./lib/jenkins'),
    slackHook = argv.s,
    slack = require('./lib/slack')(slackHook),
    jenkinsHost = argv.j,
    project = argv.p,
    ca = argv.a,
    cert = argv.c,
    key = argv.k,
    builds = [];//,
    //pow = require('./lib/pow');

jenkins.setup(jenkinsHost, project, ca, cert, key);

setInterval(
    function () {
        jenkins.get().then(function (latest) {
            if (includes(builds, latest.lastBuild)) {
                console.log('Already processed build ' + latest.lastBuild);
            } else {
                var msg = 'Prepare to be slapped :poop:';
                builds.push(latest.lastBuild);
                console.log('Processing ' + latest.lastBuild);

                if (latest.success) {
                    msg = 'Nae bother, pal - build passed :angel:';
                }
                
                return slack(msg).then(function () {
                    return latest;
                });
            }
        })
    },
    2000
);
