// create a data structure that implments the requirements of the LRU cache
// LRU cache is a cache that has a limited number of entries
// when the cache is full, if a new entry is added, the least recently used entry is removed
// O(1) time complexity for get and set

// - Initialize an object with a maximum capacity of entries
// - `geItem` return the value of the key. Update cache with most recently used key
// - `putItem` create or update a key value pair in the cache. Evict the least recently used key if the cache is full

export class LRUCache {
	constructor(capacity = 10) {
		this.capacity = capacity;
		this.cache = new Map(); // Map is an ordered list of key value pairs
	}

	getItem(key) {
		const value = this.cache.get(key);

		// Map keeps track of insertion order, this will refresh the key
		if (value) {
			this.cache.delete(key);
			this.cache.set(key, value);
		}
		return value;
	}

	putItem(key, value) {
		if (this.cache.has(key)) {
			this.cache.delete(key);
		}
		// evict the oldest item in the cache
		if (this.cache.size === this.capacity) {
			this.cache.delete(this.oldestItem);
		}
		this.cache.set(key, value);
	}

	get oldestItem() {
		return this.cache.keys().next().value;
	}
}
