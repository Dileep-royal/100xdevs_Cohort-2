/*
Write a function that calculates the time (in seconds) it takes for the JS code to calculate sum from 1 to n, given n as the input.
Try running it for
1. Sum from 1-100
2. Sum from 1-100000
3. Sum from 1-1000000000
Hint - use Date class exposed in JS
There is no automated test for this one, this is more for you to understand time goes up as computation goes up
*/

function calculateTime(n) {
const startTime = new Date().getTime();

let sum=0;
// Simulate some time-consuming operation
for (let i = 1; i <= n; i++) {
  sum+=i;
}
console.log(sum);
// Record the end time
const endTime = new Date().getTime();

// Calculate the time taken
return endTime - startTime;
}

let endValue=100;
console.log(`Time taken to compute sum of from 1 to ${endValue} is: `+ calculateTime(endValue)+" millisecond(s)");

endValue=100000;
console.log(`Time taken to compute sum of from 1 to ${endValue} is: `+ calculateTime(endValue)+" millisecond(s)");

endValue=10000000000;
console.log(`Time taken to compute sum of from 1 to ${endValue} is: `+ calculateTime(endValue)+" millisecond(s)");