const Company = require('../model/company');
const Job = require('../model/job');

const jobController = {
    getJobs: async(req,res)=>{
        try{
            const jobs = await Job.find().populate('companyId',name);
        }catch(error){
            res.status(500).json({message:"failed"});
        }
    },

    createJob: async (req,res) =>{
        try{
            const {companyId}= req.params;

            const job = new Job({
                ...req.body, companyId
            });

            const savedJob = await job.save();
            const companyToupdate = await Company.findById(companyId);
            companyToupdate.jobs.push(savedJob._id);
            await companyToupdate.save();
        }catch(error){
            res.status(500).json({message:"failed to create"});
        }
    }


}

module.exports = jobController;