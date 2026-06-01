/*
========================================
JavaScript Conditional Statements
Author: Pozhilnilavan G 
Description: Covers if, else if, else
with logical operators
========================================
*/


// ================================
// 1. Basic if-else Structure
// ================================

/*
if (condition) {
    // execute if condition is true
} else {
    // execute if condition is false
}
*/


// ================================
// 2. Time-based Greeting Example
// ================================

// If hour between 6 and 12 → Good Morning
// If hour between 12 and 18 → Good Afternoon
// Otherwise → Good Evening

let time = 5;

if (time >= 6 && time < 12) {
    console.log("Good Morning");
} 
else if (time >= 12 && time < 18) {
    console.log("Good Afternoon");
} 
else {
    console.log("Good Evening");
}


// ================================
// 3. Using Logical OR in Condition
// ================================

let hasCSE = true;
let hasExperience = false;

// If at least one condition is true → eligible
if (hasCSE || hasExperience) {
    console.log("Okay for the project");
} 
else {
    console.log("Not okay for the project");
}


// ================================
// 4. Important Notes
// ================================

/*
1. if → runs when condition is true

2. else if → checks another condition if previous is false

3. else → runs when all conditions are false

4. Conditions usually use:
   - comparison operators (>, <, ===)
   - logical operators (&&, ||)

5. Order matters in if-else:
   - First true condition will execute
   - Remaining conditions are skipped
*/