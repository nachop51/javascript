const obj1 = {
	first: "a",
	second: "b",
	third: "c",
};

const obj2 = {
	third: "d",
	fourth: "e",
};

const full = Object.assign({}, obj1, obj2); // merge objects
// This assings all the properties of obj1 and obj2 to a new object
console.log(full);

const fullObj = { ...obj1, ...obj2 }; // this also merges objects (spread operator)
// in a new object

// You can also use the spread operator to copy an object
const obj3 = {
	first: "woo",
	...obj1,
	third: "d",
	fourth: "e",
};
// Here the order matters, the last object will override the previous ones
// So, if obj1 had a property called third, it would be overriden by obj3
// but if obj3 had a property called first, it would be overriden by obj1
console.log(obj3);
