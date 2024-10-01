 const express = require('express');

 const authController = require('../controllers/authControllers')

 const authRouter = express.Router();


authRouter.post('/register',authController.register);

authRouter.post('/login',authController.login);

authRouter.post('/logout',authController.logout);
 

authRouter.get('/me',authController.me);

module.exports = authRouter;