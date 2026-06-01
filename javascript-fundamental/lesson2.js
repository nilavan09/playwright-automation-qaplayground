/*
========================================
JavaScript Strings Practice
Author: Pozhilnilavan G 
Description: Demonstrates string concatenation
and template literal (interpolation)
========================================
*/


// ================================
// 1. Variables
// ================================

let myName = "Pozhlnilavan";
let myAge = 26;


// ================================
// 2. String Concatenation
// ================================

// Combining strings using + operator
// Older way of building strings

let messageToPrint = "My name is " + myName + " and my age is " + myAge;

// Printing the result
console.log(messageToPrint);


// ================================
// 3. Template Literals (Interpolation)
// ================================

// Modern way using backticks (`)
// Allows embedding variables using ${}

let messageToPrint2 = `My name is ${myName} and my age is ${myAge}`;

console.log(messageToPrint2);


// ================================
// 4. Important Notes
// ================================

/*
1. Concatenation uses + operator
   - Works fine but becomes messy with long strings

2. Template literals (backticks ` `):
   - Cleaner and easier to read
   - Supports variable interpolation using ${}

3. Prefer template literals in modern JavaScript
*/