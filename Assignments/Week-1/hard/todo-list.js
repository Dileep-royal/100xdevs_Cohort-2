/*
  Implement a class `Todo` having below methods
    - add(todo): adds todo to list of todos
    - remove(indexOfTodo): remove todo from list of todos
    - update(index, updatedTodo): update todo at given index
    - getAll: returns all todos
    - get(indexOfTodo): returns todo at given index
    - clear: deletes all todos

  Once you've implemented the logic, test your code by running
*/

class Todo {
      
  constructor(){
     this.array=[];
  }
  add(todo){
    this.array.push(todo);
  }

  remove(index){
  //   if(index===0) this.array.shift();
  //   else if(index===array.length-1) this.array.pop();
  //   else this.array=array.slice(0,index).concat(array.slice(index+1,array.length-1));
    if(index<this.array.length) this.array.splice(index,1);
  }

  update(index,updatedTodo){
    if(index<this.array.length) this.array[index]=updatedTodo;
  }

  getAll(){
    return this.array;
  }

  get(index){
    if(index<this.array.length) return this.array[index] 
    else return null;
  }

  clear(){
    this.array.length=0;
  }

}

module.exports = Todo;
