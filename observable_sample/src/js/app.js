const rx = require('rx');

const observable1 = rx.Observable.create( observer => {
    observer.onNext('obs1 onNext.');
    observer.onNext('obs1 onNext.');
    observer.onCompleted('obs1');
});

const observable2 = rx.Observable.create( observer => {
    observer.onNext('obs2 onNext.');
    throw Error('obs2 throw error.');
    observer.onNext('obs2 onNext.');
});

(window.onload = function() {
    var rxButton1 = document.querySelector('.rxButton1');
    var rxButton2 = document.querySelector('.rxButton2');
    var rxButton3 = document.querySelector('.rxButton3');

    const success = data => { console.dir(data);};
    const failure = e => { console.dir(e); };
    const completion =  () =>{ console.log('tasks are completed!'); };

    var subscription1 = null;
    var subscription2 = null;

    rx.Observable.fromEvent(rxButton1, 'click')
                 .subscribe( () => {
                    subscription1 = observable1.subscribe(success, failure, completion);
                });

    rx.Observable.fromEvent(rxButton2, 'click')
                 .subscribe( () => {
                     subscription2 = observable2.subscribe(success, failure, completion);
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
