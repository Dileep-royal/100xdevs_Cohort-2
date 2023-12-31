/**
  You need to create an express HTTP server in Node.js which will handle the logic of a todo list app.
  - Don't use any database, just store all the data in an array to store the todo list data (in-memory)
  - Hard todo: Try to save responses in files, so that even if u exit the app and run it again, the data remains (similar to databases)

  Each todo has a title and a description. The title is a string and the description is a string.
  Each todo should also get an unique autogenerated id every time it is created
  The expected API endpoints are defined below,
  1.GET /todos - Retrieve all todo items
    Description: Returns a list of all todo items.
    Response: 200 OK with an array of todo items in JSON format.
    Example: GET http://localhost:3000/todos
    
  2.GET /todos/:id - Retrieve a specific todo item by ID
    Description: Returns a specific todo item identified by its ID.
    Response: 200 OK with the todo item in JSON format if found, or 404 Not Found if not found.
    Example: GET http://localhost:3000/todos/123
    
  3. POST /todos - Create a new todo item
    Description: Creates a new todo item.
    Request Body: JSON object representing the todo item.
    Response: 201 Created with the ID of the created todo item in JSON format. eg: {id: 1}
    Example: POST http://localhost:3000/todos
    Request Body: { "title": "Buy groceries", "completed": false, description: "I should buy groceries" }
    
  4. PUT /todos/:id - Update an existing todo item by ID
    Description: Updates an existing todo item identified by its ID.
    Request Body: JSON object representing the updated todo item.
    Response: 200 OK if the todo item was found and updated, or 404 Not Found if not found.
    Example: PUT http://localhost:3000/todos/123
    Request Body: { "title": "Buy groceries", "completed": true }
    
  5. DELETE /todos/:id - Delete a todo item by ID
    Description: Deletes a todo item identified by its ID.
    Response: 200 OK if the todo item was found and deleted, or 404 Not Found if not found.
    Example: DELETE http://localhost:3000/todos/123

    - For any other route not defined in the server return 404

  Testing the server - run `npm run test-todoServer` command in terminal
 */
  const express = require('express');
  const bodyParser = require('body-parser');
  
  const app = express();
  const port = 3002;
  const todoList= []
  var id=1;
  
  app.use(bodyParser.json());

  // endpoint-1
  app.get('/todos', (req, res) => {
      res.status(200).json(todoList);
  })
  
  // endpoint-2
  app.get('/todos/:id', (req, res) => {
    const id =parseInt(req.params.id);
    
    const todo = todoList.find((todo) => todo.id === id);
    if (!todo) return res.status(404).send('Not Found');
    res.status(200).json(todo);
  });

  // endpoint-3
  app.post('/todos', (req, res) => {
    
    const description=req.body.description;
    const title=req.body.title;
    const completed=req.body.completed;
    // console.log(id);
    // console.log(description);
    const todo={ id, title, description, completed
    }
    todoList.push(todo);
    response={id};
    res.status(201).json(response);
    id+=1;
  });

  // endpoint-4
  app.put('/todos/:id',(req,res)=>{
    let flag=0;
    const id =parseInt(req.params.id);
    const title=req.body.title;
    // const description=req.body.description;
    const completed=req.body.completed;
    // console.log(completed);
    for(let i=0;i<todoList.length;i++){
      if (todoList[i].id===id){
        // todoList[i].description=description;
        todoList[i].title=title;
        todoList[i].completed=completed;
        flag=1;
      }
    }
    if(!flag) return res.status(404).send('Id not found');
    res.status(200).send('Ok');
  });

  // endpoint-5
  app.delete('/todos/:id',(req,res)=>{
    let deleteTodoIndex;
    const targetedId =parseInt(req.params.id);
    for(let i=0;i<todoList.length;i++){
      if (todoList[i].id === targetedId){
        deleteTodoIndex=i+1;
        break;
      }
    }
    // console.log(deleteTodoIndex)
    if(!deleteTodoIndex) return res.status(404).send('Id not found');
    todoList.splice(deleteTodoIndex-1,1)
    id-=1;
    res.status(200).send('Ok');
  });

  app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
  })
  module.exports = app;