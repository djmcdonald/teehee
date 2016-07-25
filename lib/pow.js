'use strict';

var five = require('johnny-five');
var board = new five.Board({ repl: false });

module.exports = function () {
    return new Promise(function (resolve) {
        board.on('ready', function() {
            // Create an Led on pin 13
            console.log('ready');
            var led = new five.Led(13);
            // Blink every half second
            led.blink(500);

            resolve();
        });
    });
};
