import { expect, test } from "vitest";
import { binarySearch } from "./binary_search";
import { LRUCache } from "./least_recently_used";
import { sum } from "./cumulative_sum";

test("cumulative sum of array", () => {
	expect(sum([1, 3, 5, 7])).toBe(16);
	expect(sum([-2, -4, -8])).toBe(-14);
});

test("binary search", () => {
	const arr = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];

	expect(binarySearch(arr, "e")).toBe(4);
	expect(binarySearch(arr, "z")).toBe(-1);
	expect(binarySearch(arr, "a")).toBe(0);
	expect(binarySearch(arr, "i")).toBe(8);
	expect(binarySearch(arr, "b")).toBe(1);
	expect(binarySearch(arr, "c")).toBe(2);
});

test("LRU cache", () => {
	const cache = new LRUCache(3);
	cache.putItem("a", 1);
	cache.putItem("b", 2);
	cache.putItem("c", 3);
	cache.putItem("d", 4);
	expect(cache.getItem("a")).toBe(undefined);
	expect(cache.getItem("b")).toBe(2);
	expect(cache.getItem("c")).toBe(3);
	expect(cache.getItem("d")).toBe(4);
});
