// unlink() 

const fs= require('fs')
fs.unlink('file.txt',(err)=>{
    console.log('deleted file.txt');
})