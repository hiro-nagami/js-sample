const rx = require('rx');

(window.onload = function() {
    // Send string data into stream
    rx.Observable.of('Hello, world!')
        .subscribe(function(data) {
            // subscribe data by observer
            document.body.innerHTML = data;
        });
});
