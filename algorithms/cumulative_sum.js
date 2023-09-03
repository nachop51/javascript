// Given an array of integers, calculate the cumulative sum of the numbers in the array.

// const arr = [1, 3, 5, 7];

export function sum(arr) {
	// const sum = arr.reduce((acc, curr) => acc + curr, 0); // start at 0
	// console.log(sum);

	let anotherSum = 0;
	for (let i = 0; i < arr.length; i++) {
		anotherSum += arr[i];
	}
	return anotherSum;
}

// sum(arr);
