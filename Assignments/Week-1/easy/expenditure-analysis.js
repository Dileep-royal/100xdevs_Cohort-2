/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  Transaction - an object like { itemName, category, price, timestamp }.
  Output - [{ category1 - total_amount_spent_on_category1 }, { category2 - total_amount_spent_on_category2 }]
*/

function calculateTotalSpentByCategory(transactions) {

  // array to return the resul
  let output=[];

  if(transactions.length==0) return [];
  
  // storing a intial object with unique category
  output.push({"category":transactions[0]["category"],"totalSpent":transactions[0]["price"]});
  
  // traversing each object of transactions array
  for(let i=1;i<transactions.length;i++){
      let price=transactions[i]["price"];
      let category=transactions[i]["category"];
      
      categoryAlreadyExist=false;

      // traversing each object of ouput array to check if category already exists or not.
      for(let j=0;j<output.length;j++){ 
        if(output[j]["category"]===category){
          output[j]["totalSpent"]+=price;
          categoryAlreadyExist=true;
          break;
        }
      }

      if(!categoryAlreadyExist) output.push({"category":category,"totalSpent":price});
  }
  return output;
}

module.exports = calculateTotalSpentByCategory;
