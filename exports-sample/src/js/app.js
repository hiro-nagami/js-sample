const rx = require('rx');
const config = require('./config.js');
function changeText(callback = (properties) => {}) {
    callback(config);
}

(window.onload = function() {
    var button = document.querySelector('.countButton');
    var output = document.querySelector('.countOutput')

    var callback = (properties) => {
        output.textContent = JSON.stringify(properties.env);
    };

    rx.Observable.fromEvent(button, 'click')
                .subscribe(() => {
                    changeText(callback)
                });
});
