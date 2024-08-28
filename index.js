//import the express module

const express = require('express');

//create an express application
const app = express();

//define the routes and their corresponding functions
app.get('/',(req,res)=>{
    res.send("GET METHOD!");
});

app.put('/',(req,res)=>{
    res.send("PUT METHOD!");
});

app.post('/',(req,res)=>{
    res.send("POST METHOD!");
});


app.delete('/',(req,res)=>{
    res.send("DELETE METHOD!");
});


//methods with endpoints
app.get('/test',(req,res)=>{
    res.send("GET METHOD in test endpoint!");
});



//start the server by listening on port for incoming requests
app.listen(3001,"localhost",()=>{
    console.log("server is running on http://localhost:3001");
});