// console.log('Hello World!');

// This variable is type number
// let luckyNum = 57;

// The primitive data types in JavaScript are:
// String, Number, Boolean, Null, Undefined, Symbol, BigInt

// It could also be reassigned later on
// let luckyNum;
// console.log(luckyNum); // undefined
// luckyNum = null; // explicitly set to a non-value
// console.log(luckyNum); // null
// luckyNum = "twenty-seven"; // reassign to a string

// Any value that is not a primitive type, will inherit from the Object class
// luckyNum = new Object();

// Semi-colons are optional in JavaScript
// let luckyNum = 57

// This is a constant variable
// const luckyNum = 57;

// This variable is in the global scope
// let a = "global";
// let b = "Another global variable";

// function fun() {
// 	// This variable is in the local scope
// 	let b = "local";
// 	console.log("Inside fun(), b = " + b);
// 	console.log("Inside fun(), a = " + a);

// 	if (true) {
// 		// This variable is in the block scope
// 		let b = "block";
// 		console.log("Inside block, b = " + b);
// 		console.log("Inside block, a = " + a);
// 		// This variable is in the function scope
// 		// because of hoisting
// 		var c = "var";
// 	}
// }

// This is function definition statement (function declaration)
// function add(a, b) {
// a and b are parameters
// optionally you can return a value
// return a + b;
// }
// function are objects, so you can assign them to variables

// They could also be anonymous functions, as expressions
// const add = function(a, b) {
//   return a + b;
// }

// Higher order functions, are functions that take other functions as arguments, or return functions as their results
// function higherOrder(fun) {
//   fun();
//    return function() {
//      console.log('Hello World!');
//    }
// }

// The explanation of closures is that an inner function has access to the variables of its outer function, even after the outer function has returned
// This is because the variables are still in memory, they are allocated in the heap, and the garbage collector will not collect them
// function giveMeClosure() {
//   let a = 10;
//   return function() {
//     console.log(a);
//   }
// }

// function wtfIsThis() {
// 	// When a function is called on the global scope, this references the global object
// 	console.log(this); // references an object depending how the function was called
// }
// wtfIsThis();

// This is a person object
// const person = {
// // The context of this in this method is the person object
//   wtfIsThis: function() {
//     console.log(this);
//   }
// }

// You can manually set the context of this
// const person = {};

// Bind returns a new function with the context of this set to the object passed as an argument
// const personFun = wtfIsThis.bind(person);

// console.log(personFun === wtfIsThis); // false

// const person = {
// 	// Arrow syntax of functions
// 	// arrow functions do not have their own this, and they are anonymous
// 	wtfIsThis: () => {
// 		console.log(this);
// 	},
// };

// const num = 124;
// const obj = new Object();

// someFun(num, obj);
// Here, num is passed by value, and obj is passed by reference
// This means that the value of num is copied to a parameter
// Objects are stored in the heap, so the reference to the object is copied to the parameter

// const human = {
// 	dna: "GCTATCG",
// 	name: "Nacho",
// 	born: Date.now(),
// 	walk() {
// 		console.log("Walking...");
// 	},
// };

// const human = new Object();

// human.walk();
// console.log(human.born);

// Objects can inherits properties from other objects
// Thanks to a mechanism called prototype chaining
// Do not use this in real life
// human.__proto__.__proto__

// Recommended way to get the prototype of an object
// Object.getPrototypeOf(human);

// class Human {
// 	constructor(name, age) {
// 		this.dna = "GCTATCG";
// 		this.name = name;
// 		this.age = age;
// 	}

// Getter method to retrieve the value of a property
// get gender() {
// 	return this.gender;
// }

// Setter method to set the value of a property
// set gender(val) {
// 	this.gender = val;
// }

// walk() {
// 	console.log("Walking...");
// }

// This method belongs to the object, not to the class
// isHuman(human) {
//   if (human.dna === this.dna) {
//     return true;
//   }
// }

// Static methods belong to the class, not to the object
// static isHuman(human) {
//   if (human.dna === "GCTATCG") {
//     return true;
//   }
// }

// built-in data structures
// const list = ['foo', 'bar', 'baz'] // array
// dynamic collection of indexed items

// const set = new Set(["foo", "bar", "bar"]); // set
// collection of unique items

// Dictionary
// const dict = new Map([
// 	["foo", 1],
// 	["bar", 2],
// ]);

// Garbage collection is the process of automatically freeing memory on the heap
// when objects are no longer referenced by the program

// Maps will always be referencing the keys, so they will not be garbage collected
// there is also a WeakMap and a WeakSet
// WeakMap and WeakSet are garbage collected
// (to reduce memory usage)

// Non-blocking event loop
// scripts usually are executed synchronously line by line
// so, the next line of code will not be executed until the previous line has finished
// this is not the case with asynchronous code
// with the event loop, we can write asynchronous that runs in a separated thread pool
// while the rest of the code continues to execute
// this is really important for web applications, because we do not want to block the main thread
// applications are single threaded
// without async code, it will be impossible to multitask

// Easiest way to demonstrate the event loop is with setTimeout
// setTimeout(() => {
// 	console.log("This is from 5 seconds in the future :)");
// }, 5000);
// This is a callback function, it will be executed after 5 seconds
// because it gets enqueued in the event loop

// async code could also be written with promises
// promises are wrappers for values that are not yet known
// but that will resolve at some point in the future
// like a call to an API, or a database query, that resolves to some data

// const promise = new Promise((resolve, reject) => {
// 	if (greatSuccess) {
// 		resolve("Success!");
// 	} else {
// If something goes wrong, we can reject the promise to raise an error
// 		reject("Failure!");
// 	}
// });

// The consumer of the promise can handle the resolved value, or the rejected value
// promise
// 	.then((value) => {
// 		console.log(value);
// 	})
// 	.catch((error) => {
// 		console.log(error);
// 	});

// you can also define an async function that returns a promise
// async function asyncFun() {
// you can pause the execution of the function with the await keyword
// await can only be used inside async functions
// await will wait for the promise to resolve, and then it will return the value
// const result = await promise;

// in order to do error handling, you can use try/catch blocks
// to wrap the code that could throw an error
// 	try {
// 		const result = await promise;
// 	} catch (error) {
// 		console.log(error);
// 	}
// }
