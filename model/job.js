const {default : mongoose } = require("mongoose");

const JobSchema = new mongoose.Schema({
    title :String,
    description : String,
    location:String,
    salary:String,
    experience:String,
    skills:[String],
    type:{
        type:String,
        enum:['Full-time','Part-time','contract','Internship'],
        default:'Full-time'
    },
    companyId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Company'
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    }

})

module.exports = mongoose.model("Job",JobSchema,"jobs");