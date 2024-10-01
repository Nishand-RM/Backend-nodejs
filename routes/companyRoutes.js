

//import express 
const express = require('express');
const companyController = require('../controllers/companyControllers');

// create a router
const companyRouter = express.Router();

//define endpoints

//getting all companies
companyRouter.get('/',companyController.getCompanies);

//getting companies based on query params

companyRouter.get('/search',companyController.SearchCompanies);


//get a particular company

companyRouter.get('/:id',companyController.ParticularCompany);

//to create a company

companyRouter.post('/',companyController.createCompany);

//update a company

companyRouter.put('/:id',companyController.UpdateCompany);

//delete a company
companyRouter.delete('/:id',companyController.DeleteCompany);


//export the router
module.exports = companyRouter;