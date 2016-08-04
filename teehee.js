'use strict';

var argv = require('minimist')(process.argv.slice(2)),
    includes = require('lodash/includes'),
    jenkins = require('./lib/jenkins'),
    pow = require('./lib/pow'),
    slackHook = argv.s,
    slack = require('./lib/slack')(slackHook),
    jenkinsHost = argv.j,
    project = argv.p,
    ca = argv.a,
    cert = argv.c,
    key = argv.k,
    builds = [];

jenkins.setup(jenkinsHost, project, ca, cert, key);

pow().then(function (boof) {
    setInterval(
        function () {
            jenkins.get()
            .then(function (latest) {
                if (includes(builds, latest.lastBuild)) {
                    var res = latest;
                    res.doSlap = false;
                    console.log('Already processed build ' + latest.lastBuild);

                    return res;
                } else {
                    var msg = 'Prepare to be slapped :poop:',
                    res = latest;
                    res.doSlap = true;
                    builds.push(latest.lastBuild);
                    console.log('Processing ' + latest.lastBuild);

                    if (latest.success) {
                        msg = 'Nae bother, pal - build passed :angel:';
                        res.doSlap = false;
                    }

                    return slack(msg).then(function () {
                        return res;
                    });
                }
            })
            .then(function (buildStatus) {
                if (buildStatus.doSlap) {
                    console.log('Implementing slap...');
                    return boof();
                }
            });
        },
        2000
    );
});
