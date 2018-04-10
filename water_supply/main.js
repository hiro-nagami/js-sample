const rx = require('rx');

const DUST = 0;
const DARTY_WATER = 1;
const WATER = 2;
// Water stored
var store = [DUST, WATER, DARTY_WATER, DUST, WATER, WATER, DARTY_WATER, WATER, DUST];

// Send stored data into stream
rx.Observable.from(store)
    // Filter dust of stream
    .filter(function(data) {
        return data == WATER || data == DARTY_WATER;
    })
    // Translate DARTY_WATER to WATER
    .map(function(data) {
        if (data == DARTY_WATER) data = WATER;
        return data;
    })
    // Receive data from stream and output data to console
    .subscribe(function(data) {
        var output = "None";
        switch (data) {
            case DUST:
                output = "DUST";
                break;
            case DARTY_WATER:
                output = "DARTY_WATER";
                break;
            case WATER:
                output = "WATER";
                break;
            default:
                break;
        }

        console.log(output);
    });
