const rx = require('rx');

(window.onload = function() {
    var sbscBtn1 = document.querySelector('.sbscBtn1');
    var sbscBtn2 = document.querySelector('.sbscBtn2');
    var rxButton1 = document.querySelector('.rxButton1');
    var rxButton2 = document.querySelector('.rxButton2');
    var rxButton3 = document.querySelector('.rxButton3');

    const success = data => { console.dir(data);};
    const failure = e => { console.dir(e); };
    const completion =  () =>{ console.log('tasks are completed!'); };

    var subject1 = new rx.Subject();
    var subject2 = new rx.Subject();
    var subscription1 = null;
    var subscription2 = null;

    rx.Observable.fromEvent(sbscBtn1, 'click')
                 .subscribe( () => {
                     subscription1 = subject1.subscribe(success, failure, completion);
                     subject1.onNext('subscribe 1');
                });

    rx.Observable.fromEvent(sbscBtn2, 'click')
                 .subscribe( () => {
                     subscription2 = subject2.subscribe(success, failure, completion);
                     subject2.onNext('subscribe 2');
                });

    rx.Observable.fromEvent(rxButton1, 'click')
                 .subscribe( () => {
                     subject1.onNext('obs1 onNext.');
                     subject1.onNext('obs1 onNext.');
                });

    rx.Observable.fromEvent(rxButton2, 'click')
                 .subscribe( () => {
                     subject2.onNext('obs2 onNext.');
                     subject2.onError(new Error('obs2 throw error.'));
                     subject2.onNext('obs2 onNext.');
                 });

     rx.Observable.fromEvent(rxButton3, 'click')
                  .subscribe( () => {
                      if (subscription1) {
                           subscription1.dispose();
                           console.dir('disposed obs1');
                       }
                      if (subscription2) {
                           subscription2.dispose();
                           console.dir('disposed obs2');
                       }
                  });
});
