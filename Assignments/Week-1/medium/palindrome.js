/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
  // removes white spaces
  console.log(str);
  str=str.replaceAll(" ","");

  // converts the string to lowercase
  str=str.toLowerCase();
  
  // removes Special Characters
  str=str.replace(/[^a-z]/g,'');

  // two pointer approach
  let j=str.length-1;
  for(let i=0;i<=j;i++){
    if(str[i]!=str[j]) return false;
    j--;
  }
  return true;
}

module.exports = isPalindrome;
