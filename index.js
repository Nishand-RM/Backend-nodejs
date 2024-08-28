//import the express module

const express = require('express');

//create an express application
const app = express();

//to access the files
const fs = require('fs');

//to get the file info
app.get('/info',(req,res)=>{
    fs.stat('./files/file.txt', (err,stats)=>{
        if(err){
            res.send(err);
        }
        else{
            //to get only particular info about file
           /* res.json({
                size: `${stats.size} bytes`,
                isFile: stats.isFile(),
                isDirectory: stats.isDirectory(),
            });*/

            //to get entire info about file
            res.send(stats);
        }
    })
});

//to write a new context in a file

app.post('/write', (req,res)=>{
    fs.writeFile('./files/file.txt','How are you guys',(err)=>{
        if(err){
            res.send(err);
        }
        else{
            res.send('File created successfully');
        }
    })
});

//to create a new file and write in that
app.post('/create', (req,res)=>{
    fs.writeFile('./files/newfile.txt','nishand here!',(err)=>{
        if(err){
            res.send(err);
        }
        else{
            res.send('File created successfully');
        }
    })
});


//to read a file

app.get('/read',(req,res)=>{
    fs.readFile('./files/newfile.txt','utf8',(err,data)=>{
        if(err){
            res.send(err);
        }
        else{
            res.send(data);
        }
    })
})

//to copy from one file to another
app.get('/copy',(req,res)=>{
    fs.copyFile('./files/fileA.txt','./files/fileB.txt',(err)=>{
        if(err){
            res.send(err);
        }
        else{
            res.send('copied successfully');
        }
    })
})


//start the server by listening on port for incoming requests
app.listen(3001,"localhost",()=>{
    console.log("server is running on http://localhost:3001");
});