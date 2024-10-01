const {default : mongoose} = require("mongoose");


//create a schema
const CompanySchema = new mongoose.Schema({
    name:String,
    location:String,
    email:String,
    website:String,
    CreatedAt:{
        type: Date,
        default:Date.now
    },
    UpdatedAt:{
        type: Date,
        default:Date.now
    },
    jobs:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Job'
        }
    ]
})

//create  a model and export

module.exports = mongoose.model('Company',CompanySchema,'companies');