const User = require("../models/user");
const Company = require("../models/company");
const jwt = require("jsonwebtoken");
const {sendMail} = require("../middleware/sendMail")

async function getUsers(req, res) {
  try {
    const users = await User.find({ isMember: true }).select(
      "username password company companyAccess"
    );
    res.status(200).json({ users});
  } catch (err) {
    res.json({ message: err.message });
  }
}

async function userDetail(req, res) {
  try {
    const { id } = req.params;
    const user = await User.findById({ _id: id });
    res.status(200).json({ user });
  } catch (err) {
    res.json({ message: err.message });
  }
}

async function updateUser(req, res) {
  try {
    const { id } = req.params;
    const newValues = { $set: { ...req.body } };
    await User.findByIdAndUpdate({ _id: id }, newValues);
    res.json({ message: "Updated Successfully" });
  } catch (err) {
    res.json({ message: err.message });
  }
}

async function addCompanyAccess(req,res){
  try{
    const { id } = req.body;
    const { name } = req.body
    const company = await Company.findOne({company:name}).select("company userAccess")
    console.log(company.userAccess)
    await Company.findByIdAndUpdate({_id: company._id}, { $push: { userAccess: id } })
    await User.findByIdAndUpdate({ _id: id }, { $push: { companyAccess: name }})
    res.json({ message: "Updated Successfully" });
  }
  catch(err){
    res.json({ message: err.message });
  }
}

async function deleteUser(req, res) {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete({ _id: id });
    res.status("200").json({ message: "User Delete Successfully" });
  } catch (err) {
    res.status("500").json({ message: err.message });
  }
}

async function requestAccess(req,res) {
  const { company } = req.body

  // const adminId = "61277f97fa44b933f0cd8221"

  const admin = await User.findOne({isAdmin: true})
  if(!admin) return res.status(404).send("User not found")
  // console.log(admin)

  const message = `Dear admin ${admin.username}!, Please give me ( username: ${req.user.username}, _id: ${req.user._id} ) access of ${company}.`
  console.log(message)

  sendMail(admin.username, message, res)

}

module.exports = {
  getUsers,
  updateUser,
  userDetail,
  deleteUser,
  addCompanyAccess,
  requestAccess,
};
