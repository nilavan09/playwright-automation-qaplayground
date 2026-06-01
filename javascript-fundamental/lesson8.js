/*
========================================
JavaScript Functions
Author: Pozhilnilavan G 
Description: Covers function declaration,
anonymous functions, arrow functions,
arguments, return values, and imports
========================================
*/


// ================================
// 1. Function Declaration
// ================================

// Can be called before definition (hoisting)
helloOne();

function helloOne() {
    console.log("Hello 1");
}


// ================================
// 2. Anonymous Function
// ================================

// Function stored inside a variable
// Cannot be called before declaration

let helloTwo = function () {
    console.log("Hello 2");
};

helloTwo();


// ================================
// 3. Arrow Function (ES6)
// ================================

// Modern and shorter syntax

let helloThree = () => {
    console.log("Hello 3");
};

helloThree();


// ================================
// 4. Function with Arguments
// ================================

// Accepts input values (parameters)

function printName(name, age) {
    console.log(`My name is ${name} and age is ${age}`);
}

printName("pozhil", 26); // passing arguments


// ================================
// 5. Function with Return Value
// ================================

// Returns a value instead of just printing

function withReturn(num) {
    let result = num * 2;
    return result;
}

let myResult = withReturn(5);

console.log(myResult);


// ================================
// 6. Importing Functions
// ================================

// Import specific function
import { test } from "./Helper/helper.js";

test();


// Import all functions as an object
import * as myRes from "./Helper/helper.js";

myRes.test();


// ================================
// 7. Important Notes
// ================================

/*
1. Function Declaration:
   - Hoisted (can call before definition)

2. Anonymous Function:
   - Stored in variable
   - Not hoisted like declaration

3. Arrow Function:
   - Shorter syntax
   - Common in modern JS

4. Arguments vs Parameters:
   - Parameters → in function definition
   - Arguments → values passed during call

5. return:
   - Sends value back from function
   - Stops function execution

6. Imports:
   - Used to reuse code from other files
   - Requires module setup (ES Modules)
*/