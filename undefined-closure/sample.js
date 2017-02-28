
function f(callback) {
	const a = 3;
	const b = 4;
	callback(a,b);
}

var c = (a,b) => {
	console.log(`a=${a}, b=${b}`);
};

c(1,2);		// => a=1, b=2

f(c); 		// => a=3, b=4

c=undefined;
f(c); 		// => error
