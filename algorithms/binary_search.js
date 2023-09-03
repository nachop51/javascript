// create a function that takes a sorted array
// and a target value. Return the index of the target value in the array.
// If the target value is not in the array, return -1.

export function binarySearch(arr, target, start = 0, end = arr.length - 1) {
	const mid = Math.floor(start + (end - start) / 2);

	if (start > end) return -1;
	if (arr[mid] === target) return mid;
	if (arr[mid] > target) {
		return binarySearch(arr, target, start, mid - 1);
	} else {
		return binarySearch(arr, target, mid + 1, end);
	}
}

// console.log(binarySearch([1, 3, 5, 7], 5)); // 2

// const arr = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];

// console.log(binarySearch(arr, "e")); // 4
// console.log(binarySearch(arr, "z")); // -1
// console.log(binarySearch(arr, "a")); // 0
// console.log(binarySearch(arr, "i")); // 8
// console.log(binarySearch(arr, "b")); // 1
// console.log(binarySearch(arr, "c")); // 2
