/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/

function isAnagram(str1, str2) {
  
  // Validating  the length of strings
  if(str1.length!==str2.length) return false;
  
  // converting upper case to lower case
  str1=str1.toLowerCase();
  str2=str2.toLowerCase();

  // ===================Approach-1=====================
  // Time Complexity: O(N^2)
  // matching every element of str1 with every element of str2

  // for(let i=0;i<str1.length;i++){
  //   let flag=0;
  //   for(let j=0;j<str1.length;j++){
  //     if(str1[i]==str2[j]){
  //       flag=1;
  //       break;
  //     }
  //   }
  //     if(flag!=1) return false;
  // }
  
  //===================Approach-2===================
  
  const charSet=new Map();
  // maps each letter as key with the count of each letter as value
  for(const element of str1){
    charSet.set(element,(element.charCodeAt(0) || 0)+1);
  }
  
  // checking the count of letters in str1 is equal or not to str2.
  for(const element of str2){
    let count=charSet.get(element);
    if(!count) return false; // if count any letter is zero or undefined then simply return false
    charSet.set(element,count-1);
  }

  return true;
}

module.exports = isAnagram;
