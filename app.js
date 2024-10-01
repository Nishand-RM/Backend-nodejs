

const express = require('express');

//create an express application 
const app = express();

const companyRouter = require('./routes/companyRoutes');

//parse middleware to use req body
app.use(express.json());


//import companyroute here

app.use('/companies', companyRouter);





module.exports = app;