const rx = require('rx');
function changeText(str, callback = (subject, verb) => {}) {
    var beforeSubject = str.split(':')[0];
    var beforeVerb = str.split(':')[1];

    var nextSubject = '';
    var nextVerb = '';
    switch (beforeSubject) {
        case 'He':
            nextSubject = 'She';
            break;
        case 'She':
            nextSubject = 'It';
            break;
        default:
            nextSubject = 'He';
    }

    switch (beforeVerb) {
        case 'waking up':
            nextVerb = 'sleeping';
            break;
        default:
            nextVerb = 'waking up';
    }

    callback(nextSubject, nextVerb);
}

(window.onload = function() {
    var button = document.querySelector('.countButton');
    var output = document.querySelector('.countOutput')

    var callback = (subject, verb) => {
        output.textContent = `${subject}:${verb}`;
    };

    rx.Observable.fromEvent(button, 'click')
                .subscribe(() => {
                    changeText(output.textContent, callback)
                });
});
