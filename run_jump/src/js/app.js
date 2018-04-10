const rx = require('rx');

Pow = function() {
    // this.subject = new rx.Subject();
    // this.observable = this.subject.publish();
};

Pow.prototype.read = function(action) {
    this.subject.onNext(action);
};

Pow.prototype.subscribe = function(success, failure, completion) {
    this.subject = new rx.Subject();
    this.observable = this.subject.publish();
    this.observable.subscribe(success, failure, completion);
}

Pow.prototype.start = function() {
    console.log('-----> Game start!');
    this.subscription = this.observable.connect();
};

Pow.prototype.finish = function() {
    console.log('-----> Mario did goal!');
    this.subject.onCompleted();
    this.subscription.dispose();
};

/**

function runEvent(event) {
    if (event == 'move') {
        ...
    }

    if (event == 'jump') {
        ...
    }

    if (event == 'setup') {
        ...
    }

    ...
}

*/

function initialUIAndActions() {
    // UI
    var startButton = document.querySelector('.start');
    var finishButton = document.querySelector('.complete');

    var moveButton = document.querySelector('.move');
    var jumpButton = document.querySelector('.jump');
    var stepupButton = document.querySelector('.stepup');


    // Actions
    const success = action => { console.log(`Mario did ${action}.`); };
    const failure = e => { console.dir(e); };
    const completion = () =>{ console.log('Call completion'); };


    // connection actions
    var pow = new Pow();
    pow.subscribe(success, failure, completion);

    /* start */
    rx.Observable.fromEvent(startButton, 'click').subscribe(() => {
        pow.start();
    });

    /* completion */
    rx.Observable.fromEvent(finishButton, 'click').subscribe(() => {
        pow.finish();
    });

    /* move */
    rx.Observable.fromEvent(moveButton, 'click').subscribe(() => {
        pow.read('MOVE');
    });

    /* jump */
    rx.Observable.fromEvent(jumpButton, 'click').subscribe(() => {
        pow.read('JUMP');
    });

    /* step up */
    rx.Observable.fromEvent(stepupButton, 'click').subscribe(() => {
        pow.read('MOVE');
        pow.read('JUMP');
    });
};

(window.onload = function() {
    initialUIAndActions();
});
