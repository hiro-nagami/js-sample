const rx = require('rx');
rx.Observable.just("hoge", "fssuga")
    .map(function(s) {
        return s.length;
    })
    .subscribe(function (n) {
        console.dir(n);
    });
