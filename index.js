//import app

const app = require('./app');





const mongoose = require('mongoose');
const { MONGODB_URI } = require('./utils/config');

mongoose.connect(MONGODB_URI)
.then(()=>{
    console.log("connected to mongo db");
    app.listen(3001, () => {
        console.log("server is running on http://localhost:3001");
    });
})
.catch((err)=>{
    console.log("failed to connect",err)
})



