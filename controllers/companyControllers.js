//import company 

const Company = require('../model/company');




const companyController = {

    getCompanies: async (req, res) => {
        try {
            const companies = await Company.find().populate('jobs','-companyId -_v');
            res.status(200).json(companies);
        } catch (error) {
            res.json({ message: "failed" })
        }
    },

    SearchCompanies:async (req, res) => {
        
        
           const {query} = req.query;
           const regex = new RegExp(query,'i');
           const companies = await Company.find({
            $or:[
                {
                    name:regex
                        
                    
                },
                {
                    location:regex
                },
            ]
           }).lean();
        
    
        res.status(500).json(companies);

    },

    ParticularCompany: async (req, res) => {

        try {
            const { id } = req.params;
            const company = await Company.findById(id);

            if (!company) {
                res.json({ message: "company not found" });
            }

            res.json(company);
        } catch (error) {
            res.status(500).json({ message: "failed to fetch company by id" });
        }

    },

    createCompany: async (req, res) => {
        try {
            const company = req.body;

            //create a new company 
            const newCompany = new Company(company);

            //save the comapny
            const SavedCompany = await newCompany.save();
            res.json({ message: "company created successfully", company: SavedCompany });

        } catch (error) {
            res.status(500).json({ message: "failed to create company" });
        }

    },

    UpdateCompany: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, location, email, phone, website } = req.body;

            const companyToupdate = {
                name,
                location,
                email,
                phone,
                website
            }

            const UpdateCompany = await Company.findByIdAndUpdate(id, companyToupdate);
            res.json({ message: "updated successfully" });


        } catch (error) {
            res.status(500).json({ message: "comapny not updated" })
        }

    },

    DeleteCompany: async (req, res) => {
        try {
            const { id } = req.params;
            await Company.findByIdAndDelete(id);
        } catch (error) {
            res.status(500).json({ message: "failed to delete" });
        }



    },


}

module.exports = companyController;