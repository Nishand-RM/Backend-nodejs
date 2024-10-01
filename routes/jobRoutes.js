const express = require("express");
const jobController = require('../controllers/jobControllers');
const jobRouter = express.Router();

//endpoints

jobRouter.get('/',jobController.getJobs);

jobRouter.post('/company/:companyId',jobController.createJob);

module.exports = jobRouter;