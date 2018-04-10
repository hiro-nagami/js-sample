const rx = require('rx');
function countClick(count) {
    document.querySelector('.countOutput').textContent = `clicked ${count} times`;
}

(window.onload = function() {
    var button = document.querySelector('.countButton');
    rx.Observable.fromEvent(button, 'click')
                .scan(count => count + 1, 0)
                .subscribe(countClick);
});
