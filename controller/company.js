const Company = require("../models/company")
const User = require("../models/user")

async function createCompany(req, res) {
    try {
        const { name, id } = req.body
        console.log(req.user)
        const company = new Company({
            company: name,
            creater: req.user._id
        })
        await company.save()
        const newUserValues = { $set: { company: name } }
        await User.updateOne({ _id: req.user._id }, newUserValues);
        res.status("200").json({ message: "sucessfully create Company", company })
    }
    catch (err) {
        res.status("500").json({ message: err.message })
    }
}

async function updateCompany(req, res) {
    try {
        const { id } = req.params;
        const newCompanyValues = { $set: { ...req.body } };
        const company = await Company.updateOne({ _id: id }, newCompanyValues);
        res.send({ message: "Campagin Updated Successfully", company });
    } catch (err) {
        res.send({ message: err.message });
    }
}

async function deleteCompany(req, res) {
    try {
        const { id } = req.params
        await Company.findByIdAndDelete({ _id: id })
        res.status("200").json({ message: "Delete Successfully" })
    }
    catch (err) {
        res.status("500").json({ message: err.message })
    }
}

async function getAllCompanies(req,res) {
    try{
        const companies = await Company.find()
        console.log(companies)
        res.status("200").json(companies)
    }
    catch(err){
        res.status("500").json({message:err.message})
    }
}

module.exports = { createCompany, deleteCompany, updateCompany, getAllCompanies }