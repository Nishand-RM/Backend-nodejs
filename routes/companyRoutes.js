let companies = [
    {
        id:1,
        name:"Google",
        location:"chennai",
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


//import express 
const express = require('express');

// create a router
const companyRouter = express.Router();

//define endpoints

//getting all companies
companyRouter.get('/',(req,res)=>{
    
    res.json(companies);

})

//getting companies based on query params

companyRouter.get('/search',(req,res)=>{
    const {id,name,location} = req.query;
    let company;
    if(id){
        company = companies.find(com=> com.id === id);
    }

    if(location && !name){
        company = companies.filter(com => com.location.toLocaleLowerCase() === location.toLocaleLowerCase());

    }

    if(location && name){
        company = companies.filter(com => com.location.toLocaleLowerCase() === location.toLocaleLowerCase());

        company = companies.filter(com => com.name.toLocaleLowerCase() === name.toLocaleLowerCase());

    }

    if(!company){
        res.json({message:"company details not matched"});

    }

    res.json(company);


})


//get a particular company

companyRouter.get('/:id',(req,res)=>{
    const id = parseInt(req.params.id);

    const company = companies.find(com=> com.id === id);

    if(!company){
        res.json({message:"company not found"});
    }

    res.json(company);
})

//to create a company

companyRouter.post('/',(req,res)=>{

    const comp = req.body;
    comp.id = companies[companies.length - 1].id + 1;
    companies.push(comp);
    res.json({message:"company created successfully"});
});

//update a company

companyRouter.put('/:id',(req,res)=>{
    const id = parseInt(req.params.id);
    const { name } = req.body;
    const company = companies.find(com => com.id === id);
    company.name = name;
    companies = companies.map(com => com.id === id ? company : com);
    res.json({message:"updated successfully"});
});

//delete a company
companyRouter.delete('/:id',(req,res)=>{
    const id = parseInt(req.params.id);

    companies = companies.filter(com => com.id !== id);
    res.json({message:"deleted successfully"});
})


//export the router
module.exports = companyRouter;