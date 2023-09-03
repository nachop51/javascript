const x = "";
const y = x ?? "default string";

console.log(y); // default string
// The nullish coaleshing operator (??) is a logical operator that returns its
// right-hand side operand when its left-hand side operand is null or undefined,
// and otherwise returns its left-hand side operand.
// This is because the nullish coalescing considers less values to be nullish (null or undefined) than the logical OR operator.
