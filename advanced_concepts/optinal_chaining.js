const obj = undefined;

console.log(obj.hello); // this will throw an error, because obj is undefined

// old way of checking for undefined
if (obj) {
	console.log(obj.hello);
}
// or
obj && console.log(obj.hello);

// modern javascript way of checking for undefined
console.log(obj?.hello); // this will not throw an error, in case obj is undefined
// it returns undefined

function foo(a, b) {}
// if foo is defined, call it with the arguments 1 and 2
foo?.(1, 2);

const arr = [1, 2, 3];
// if arr is defined, get the first element
console.log(arr?.[0]);

const obj2 = {
	foo: {
		bar: {
			baz: 42,
		},
	},
};

// if obj2 is defined, get the baz property
console.log(obj2?.foo?.bar?.baz); // 42
// if some property is undefined, it will return undefined
console.log(obj2?.foo?.bar?.baz?.hello); // undefined
