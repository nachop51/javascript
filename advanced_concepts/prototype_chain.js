const animal = {
	dna: 123,
	legs: {
		front: 2,
		back: 2,
	},
	sleep() {
		console.log("zzz");
	},
};

const p1 = Object.getPrototypeOf(animal);
// It will print base object, which you can think of as the parent
console.log(p1); // [Object: null prototype] {}
const p2 = Object.getPrototypeOf(p1);
// It will print null, indicating that is the end of the prototype chain
console.log(p2); // null

const dog = {
	bark() {
		console.log("woof");
	},
};

Object.setPrototypeOf(dog, animal); // sets the prototype of dog to animal

console.log(dog.dna); // so it inherits all the properties of animal

console.log(Object.getPrototypeOf(dog)); // prints out the animal object
