

const express = require('express');

//create an express application 
const app = express();

const companyRouter = require('./routes/companyRoutes');


const jobRouter = require('./routes/jobRoutes')

const authRouter = require('./routes/authRoutes');
//parse middleware to use req body
app.use(express.json());




//import companyroute here

app.use('/companies', companyRouter);

app.use('/jobs',jobRouter);

app.use('/auth',authRouter);


module.exports = app;