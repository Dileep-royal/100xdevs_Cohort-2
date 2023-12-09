 
function sum(num1, num2) {
    let result = num1 + num2;
    return displayResult(result);
}

function displayResult(data) {
    console.log("Result of the sum is : " + data);
}

function displayResultPassive(data) {
    console.log("Sum's result is : " + data);
}

sum(2,3);

// You are only allowed to call one function after this
// How will you displayResult of a sum