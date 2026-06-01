/*
========================================
JavaScript Loops
Author: Pozhilnilavan G
Description: Covers for loop, for...of loop,
and forEach (ES6)
========================================
*/


// ================================
// 1. Why Loops?
// ================================

// Instead of writing same code multiple times,
// loops help us repeat tasks efficiently


// ================================
// 2. For Loop
// ================================

/*
for (initialization; condition; increment) {
    // code executes repeatedly
}
*/

for (let i = 0; i < 5; i = i + 1) {
    console.log("Hello World: " + i);
}


// ================================
// 3. for...of Loop
// ================================

// Used to iterate over array elements

let having = ["air", "fire", "land", "water"];

for (let item of having) {
    console.log(item);

    // break stops the loop when condition is met
    if (item === "fire") {
        break;
    }
}


// ================================
// 4. forEach Loop (ES6)
// ================================

// Runs a function for each element in array

having.forEach((item) => {
    console.log(item);
});


// ================================
// 5. Important Notes
// ================================

/*
1. for loop:
   - Best when you need index (i)
   - Full control over loop

2. for...of:
   - Simpler way to loop through arrays
   - Direct access to values

3. forEach:
   - Cleaner syntax (ES6)
   - Cannot use break or continue

4. break:
   - Stops loop immediately

5. Always use 'let' for loop variables
*/