const arr = [1, 2, 3, 3, 3, 4, 5];
const zeros = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // nope
const arrr2 = Array(100).fill(0); // yep

// this is a range:
const range = Array.from({ length: 100 }, (v, i) => i + 1);
console.log(range);
// or
const range2 = Array(100)
	.fill(0)
	.map((v, i) => i + 1);
console.log(range2);
// or even
const range3 = [...Array(100).keys()];
console.log(range3);

const unique = [...new Set(arr)]; // convert back to array

// easiest way to loop over an array
for (const val of arr) {
	console.log(val);
}

// it iterates over property names
// so it is not recommended for arrays
// unspecific order
for (const idx in arr) {
	console.log(idx);
}

// index and value
// imperative style
for (const [i, val] of arr.entries()) {
	console.log(i, val);
}

// functional style
arr.forEach((val, i) => console.log(i, val));

// classic for loop
for (let i = 0; i < arr.length; i++) {
	console.log(i, arr[i]);
}
