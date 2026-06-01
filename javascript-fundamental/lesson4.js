/*
========================================
JavaScript Comparison Operators
Author: Pozhilnilavan G 
Description: Covers relational operators
and equality (loose vs strict comparison)
========================================
*/


// ================================
// 1. Relational Operators
// ================================

// >  → Greater than
// <  → Less than
// >= → Greater than or equal to
// <= → Less than or equal to

let op1 = 10 > 5;
console.log(op1);

let op2 = 5 < 10;
console.log(op2);

let op3 = 10 >= 5;
console.log(op3);

let op4 = 5 <= 10;
console.log(op4);


// ================================
// 2. Equality Operators
// ================================

// Example variable (string type)
let x = "1";


// Loose Equality (==)
// Compares values only (type conversion happens automatically)
console.log(x == "1");


// Strict Equality (===)
// Compares both value and data type (no type conversion)
console.log(x === "1");


// Comparing string with number
console.log(x === 1);


// ================================
// 3. Important Notes
// ================================

/*
1. Relational operators always return boolean (true/false)

2. == (loose equality):
   - Converts types before comparison
   - Can lead to unexpected results

3. === (strict equality):
   - Does NOT convert types
   - Safer and recommended in modern JavaScript

4. Best practice:
   Always use === instead of ==
*/