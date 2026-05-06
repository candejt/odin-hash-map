import HashSet from "./hashSet.js";

const test = new HashSet();

test.set("Batman");
test.set("Iron Main");
test.set("Batman");

console.log(test.length());
console.log(test.keys());