/*
========================================
JavaScript Basics Practice
Author : Pozhilnilavan G 
Description: This file covers basic JS concepts like
- console output
- variables (var, let, const)
- data types
========================================
*/


// ================================
// 1. Hello World
// ================================

// console.log() is used to print output to the console
console.log("Hello World");


// ================================
// 2. Variables
// ================================

// 'var' and 'let' are used to declare variables
// Difference:
// - var: function-scoped (older way, avoid using in modern JS)
// - let: block-scoped (recommended)

var firstName = "Pozhil";
let lastName = "Nilavan G";

// Printing variable value
console.log(firstName);


// ================================
// 3. Declaring multiple variables
// ================================

// Declared first, assigned later
var age, dateOfBirth, sex;

// age should be a number
age = 26;

// Stored as string because of format
dateOfBirth = "09/01/2000";

sex = "male";

console.log(age);
console.log(dateOfBirth);
console.log(sex);


// ================================
// 4. Constants
// ================================

// const = value cannot be reassigned
const occupation = "Engineer";
console.log(occupation);


// ================================
// 5. Data Types in JavaScript
// ================================

// String → text
let name = "nature";

// Number → numeric value
let personAge = 26;

// Boolean → true / false
let isHeMarried = false;

// Null → intentional empty value
let observable = null;

// Undefined → declared but not assigned
let youKnow;

console.log(typeof name);
console.log(typeof personAge);
console.log(typeof isHeMarried);
console.log(typeof observable);  // JS quirk: returns "object"
console.log(typeof youKnow);


// ================================
// 6. Important Notes
// ================================

/*
1. Prefer 'let' and 'const' over 'var'
2. Use meaningful variable names
3. Be careful with data types (number vs string)
4. typeof helps in debugging
5. null = intentional empty value
   undefined = not assigned
*/