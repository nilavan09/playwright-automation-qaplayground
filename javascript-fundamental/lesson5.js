/*
========================================
JavaScript Logical Operators
Author: Pozhilnilavan G 
Description: Covers AND (&&), OR (||),
and NOT (!) operators with examples
========================================
*/


// ================================
// 1. Logical AND (&&)
// ================================

// AND returns true only if ALL conditions are true
console.log(true && true);

let isAgeOkay = true;
let isBikeOkay = false;

// Both conditions must be true
let eligibilityForDrive = isAgeOkay && isBikeOkay;

console.log("He is eligible: " + eligibilityForDrive);


// ================================
// 2. Logical OR (||)
// ================================

// OR returns true if ANY one condition is true
console.log(false || true);

let hasCSE = false;
let hasExperience = false;

// At least one condition should be true
let jobEligibility = hasCSE || hasExperience;

console.log("Eligible for the project: " + jobEligibility);


// ================================
// 3. Logical NOT (!)
// ================================

// NOT reverses the value
console.log(!true); // becomes false


// ================================
// 4. NOT EQUAL (!==)
// ================================

// !== checks both value and type are NOT equal
console.log(6 !== 10);


// ================================
// 5. Important Notes
// ================================

/*
1. && (AND)
   - All conditions must be true

2. || (OR)
   - At least one condition must be true

3. ! (NOT)
   - Reverses true ↔ false

4. !== (Strict not equal)
   - Checks both value and type are different

5. These are heavily used in:
   - if conditions
   - validations
   - automation testing logic
*/