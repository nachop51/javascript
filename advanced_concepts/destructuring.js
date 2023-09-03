const dog = {
	name: "fido",
	age: 4,
	bark() {
		console.log("woof");
	},
};

// This two pieces of code are equivalent
// const name = dog.name;
// const age = dog.age;
// const { name, age } = dog; // destructuring

const { name: fullName, age } = dog; // you can rename the variables

const arr = ["foo", "bar", "baz"];

const [a, b, c] = arr; // destructuring

const [, , d] = arr; // you can skip elements
// same as
const x = arr[2];

const [e] = arr; // you can use the rest operator
// same as
const y = arr[0];

const [f, ...g] = arr; // you can use the rest operator

console.log(fullName, age, a, b, c, d, e, f, g, y, x);
