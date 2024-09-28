const companies = [
    {
        id:1,
        name:"Google",
        location:"Hyderabad",
        email:"carrer@google.com"
    
    },
    {
        id:2,
        name:"Facebook",
        location:"Banglore",
        email:"carrer@Facebook.com" 
    },
    {
        id:3,
        name:"IBM",
        location:"Chennai",
        email:"carrer@IBM.com"
    }
];


const express = require('express');

const app = express();

//parse middleware to use req body
app.use(express.json());



app.get('/companies',(req,res)=>{
    
    res.json(companies);

})


app.post('/companies',(req,res)=>{

    const comp = req.body;
    comp.id = companies[companies.length - 1].id + 1;
    companies.push(comp);
    res.json({message:"company created successfully"});
});


app.put('/companies/:id',(req,res)=>{
    const id = parseInt(req.params.id);
    const {name} = req.body;
    const company = companies.find(comp => comp.id === id);
    company.name = name;
    companies = companies.map(comp => comp.id === id ? company : comp);
});


module.exports = app;