'use strict';

var five = require('johnny-five');

module.exports = function () {
    return new Promise(function (resolve) {
        var board = new five.Board({ repl: false });

        board.on('ready', function () {
            var led = new five.Led(13),
                servo = new five.Servo({
                    pin: 9,
                    center: true
                }),
                control = function () {
                    return new Promise(function (resolve) {
                        led.on();
                        servo.sweep();
                        setTimeout(function () {
                            servo.stop();
                            led.off();
                            resolve();
                        }, 3000);
                    })
                };
            console.log('Board is ready.');

            resolve(control);
        });
    });
};
