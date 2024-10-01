
const User = require('../model/user');
const authController ={
    register :async(req,res)=>{
        
        try{
        const {name,email,password}= req.body;

        //check user already exist

        const userExists = await User.findOne({email});

        if(userExists){
           return res.status(200).json({message:"user already present"});
        }

        const newUser = new User({name,email,password});

        await newUser.save();

        res.status(200).json({message:"user created successfully"});

    }catch(error){
        res.status(500).json({message:"user notcreated"});

    }

    },

    login :async(req,res)=>{
        
    },

    logout :async(req,res)=>{
        
    },

    me :async(req,res)=>{
        
    }


}

module.exports = authController;