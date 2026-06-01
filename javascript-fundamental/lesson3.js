/*
========================================
JavaScript Objects & Arrays Practice
Author: Pozhilnilavan G 
Description: Covers object creation, property access,
modification, and basic array operations
========================================
*/


// ================================
// 1. Object Creation
// ================================

// Object representing basic details
let myObject = {
    name: "pozhil",
    origin: "World",
    having: ["air", "fire", "land", "water"] // array inside object
};


// ================================
// 2. Accessing Object Properties
// ================================

// Access full object
console.log(myObject);

// Access specific property
console.log(myObject.name);


// ================================
// 3. Modifying Object Properties
// ================================

// Changing value of existing property
myObject.name = "world all";

console.log(myObject.name);


// ================================
// 4. Accessing Array Inside Object
// ================================

// Accessing element from array inside object
console.log(myObject.having[1]); // "fire"


// ================================
// 5. Arrays
// ================================

// Creating a separate array
let elements = ["air", "fire", "land", "water"];

// Modifying array value using index
elements[0] = "katru";

console.log(elements[0]);


// ================================
// 6. Accessing Object Array Again
// ================================

// Accessing another element from object's array
console.log(myObject.having[3]); // "water"


// ================================
// 7. Important Notes
// ================================

/*
1. Objects store data in key-value pairs
   Example: name → "pozhil"

2. Access object values using:
   - dot notation → myObject.name
   - bracket notation → myObject["name"]

3. Arrays use index (starting from 0)
   Example:
   having[0] → "air"
   having[1] → "fire"

4. Objects can contain arrays (very common in real projects)

5. Both objects and arrays are mutable
   → values can be changed after creation
*/