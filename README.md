# teehee

## Purpose

This project was part of a hackathon involving an Arduino Uno.

It monitors the given Jenkins server with the given project name to determine if the build has passed or failed: if it passes it sends a nice message on a Slack channel; if it fails, it sends a not so nice message on a Slack channel and using an Arduino and a servo, moves an arm back and forth (imitating a slap).

## Pre-requisites

You'll need the following:
 * Arduino Uno
 * Servo
 * LED
 * Jenkins build server
 * Slack web-hook posting to a Slack channel

## Usage

teehee has the following command line arguments:

```shell
$ node teehee.js \\
    -j :jenkins-host \\
    -p :jenkins-project-name \\
    -a :certificate-authority-cert \\
    -c :pem-formatted-ssl-cert \\
    -k :pem-formatted-ssl-key \\
    -s :slack-web-hook-address
```

I've made no effort to make these arguments optional: the CA, SSL cert, and SSL key are all required as my Jenkins host was protected by client SSL authentication.
