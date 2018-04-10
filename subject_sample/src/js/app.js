const rx = require('rx');

Pow = function() {
    this.subject = new rx.Subject();
    this.observable = this.subject.publish();
    this.observable.connect();
}



Pow.prototype.start = function() {
    const success = num => { console.dir(`${num} * ${num} = ${num*num}`); };
    const failure = e => { console.dir(e); };
    const completion = () =>{ console.log('tasks are completed!'); };

    this.observable.subscribe(success, failure, completion);
    console.log('subscribed');
}

Pow.prototype.read = function(num) {
    if (isNaN(num)) {
        this.subject.onError(new Error('Data is invalid.'));
    }

    this.subject.onNext(num);
};

Pow.prototype.finish = function() {
    this.subject.onCompleted();
};

(window.onload = function() {
    var startButton = document.querySelector('.start');
    var completeButton = document.querySelector('.complete');

    var successButton = document.querySelector('.success');
    var failureButton = document.querySelector('.failure');

    var pow = new Pow();

    rx.Observable.fromEvent(startButton, 'click').subscribe(() => {
        pow.start();
    });

    rx.Observable.fromEvent(completeButton, 'click').subscribe(() => {
        pow.finish();
    });

    rx.Observable.fromEvent(successButton, 'click').subscribe(() => {
        pow.read(2);
        pow.read(3);
        pow.read(5);
        pow.read(7);
    });

    rx.Observable.fromEvent(failureButton, 'click').subscribe(() => {
        pow.read(2);
        pow.read(3);
        pow.read('five');
        pow.read(7);
    });


});
