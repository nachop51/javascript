// closures are functions that can access variables outside of their scope (curly braces)

// lexical environment
const state = "🐝";

// function that captures the state variable
function sayHi() {
	console.log(`Hi ${state}`);
}

// this is not a closure
// this is a fully self contained closed expression
function pureFun(a, b) {
	return a + b;
}
// when is called, a and b are pushed onto the call stack
// pureFun(2, 3);
// so the stack memory looks like this:
// A: | 2 |
// B: | 3 |
// when the function returns, the memory is cleared, so a and b are removed from the stack

// parent scope
let b = 3;

// this is a closure
// the function scope captures the parent scope
function impureFun(a) {
	return a + b;
}

// the call stack is short lived
// while the heap memory is long lived
// it can keep data in memory indefinitely

// the most important use of closures is for data encapsulation

// if we want some outside code to be able to access the state variable
function outer() {
	let state = "";
	// we can return a function that has access to the state variable
	return function inner() {
		state += "🐷🐝";
		console.log(state);
	};
}

// we can assign the returned function to a variable
const fn = outer();
fn();
fn();
fn();
