const rx = require('rx');

Pow = function() {
    this.subject = new rx.Subject();
    this.observable = this.subject.publish();
    this.observable.connect();
}

Pow.prototype.read = function(numArray) {
    for (var num in numArray) {
        this.subject.onNext(numArray[num]);
    }
};

(window.onload = function() {
    var runButton = document.querySelector('.run');

    const success = num => { console.dir(`${num} * ${num} = ${num*num}`); };
    const failure = e => { console.dir(e); };
    const completion = () =>{ console.log('tasks are completed!'); };

    var pow = new Pow();
    pow.observable.subscribe(success, failure, completion);

    rx.Observable.fromEvent(runButton, 'click').subscribe(() => {
        pow.read([2,3,5,7]);
        pow.read([2,3,'five',7]);
    });
});
