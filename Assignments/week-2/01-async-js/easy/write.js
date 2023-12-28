const fs= require('fs')

// fs.writeFile('./file1.txt', 'utf8', (err, data) => {
//     if (err) throw err;
//     console.log(data)
// })
let data="\n 1.hi i am writing into file and saved";

fs.writeFile('./file.txt', data,(err)=>{
 if(err) throw err;
 console.log("file was written and saved..!");
})

data="\n 2. data is appended into file and saved";
fs.appendFile('./file2.txt', data,(err)=>{
    if(err) throw err;
    console.log("file is appended and saved..!");
   })