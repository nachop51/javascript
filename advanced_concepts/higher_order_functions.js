// function definition or declaration
// this normal function is hoisted
// this means that it is moved to the top of the file
// so it can be used before it is defined
function sayHi(message) {
	return "Hi " + message;
}

// This is a function expression
// it is not hoisted, the function is not created until this line is reached
const sayHii = function (message) {
	return "Hi " + message;
};

const arr = [1, 2, 3, 4, 5];

// expressions can also be anonymous
const anon = arr.map(function (item) {
	return item * 2;
});

// expresions can aslo be IIFE's (immediately invoked function expressions)
(function () {
	console.log("Hello");
})();

// Higher order functions
// A higher order function is a function that takes a function as an argument, or returns a function
// A function that is passed as an argument to another function is called a callback function
// A function that returns a function is called a factory function
function funWrapper(callback) {
	callback("called from funWrapper");
}

funWrapper(sayHi);
funWrapper(() => console.log("Hi from callback"));

function funCreator() {
	return function (message) {
		return "Hi " + message;
	};
}

const fn = funCreator();

console.log(fn("from funCreator"));
