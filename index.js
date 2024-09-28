//import app

const app = require('./app');



//import dotenv
require('dotenv').config();

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
    console.log("connected to mongo db");
    app.listen(3001, () => {
        console.log("server is running on http://localhost:3001");
    });
})
.catch((err)=>{
    console.log("failed to connect",err)
})



