const rx = require('rx');

function executeRx() {
    const success = (data)=>{ console.dir(data); console.dir(data);};
    const failure = (e)=>{ console.dir(e); };
    const completion = ()=>{ console.log('It is completed!'); };
    rx.Observable.just('clicked.success.1').subscribe(success, failure);
    rx.Observable.throw(new Error('clicked.failure.1')).subscribe(success, failure);

    rx.Observable.just('clicked.success.2').subscribe(success, failure, completion);
    rx.Observable.throw(new Error('clicked.failure.2')).subscribe(success, failure, completion);
}

(window.onload = function() {
    var button = document.querySelector('.countButton');
    var output = document.querySelector('.countOutput')

    var callback = (properties) => {
        output.textContent = JSON.stringify(properties.env);
    };

    rx.Observable.fromEvent(button, 'click')
                .subscribe(executeRx);
});
