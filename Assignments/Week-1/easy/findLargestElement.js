/*
  Write a function `findLargestElement` that takes an array of numbers and returns the largest element.
  Example:
  - Input: [3, 7, 2, 9, 1]
  - Output: 9
*/

function findLargestElement(numbers) {
    largestElement=0;
    numbers.forEach(element => {
        if(element>largestElement){
           largestElement=element;
        }
    });
    return largestElement;
}

module.exports = findLargestElement;