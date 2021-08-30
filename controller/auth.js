const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Company = require("../models/company");
require("dotenv").config();

async function registerMember(req, res) {
  try {
    const { username, password } = req.body;
    const userInDb = await User.findOne({ username: username });
    if (userInDb) {
      return res.status("400").send({ message: "Username is already exist" });
    }
    // const companiesArray = []

    // for(var i=0; i<companies.length; i++){
    //   const item = companies[i]
    //   const company = new Company({
    //     company:item
    //   })
    //   console.log(company)
    //   companiesArray.push(company)
    // }

    const user = new User({
      username: username,
      password: password,
      isMember: true,
      // companies: companiesArray,
    });

    await user.save();
    res.status("200").send({ user, message: "Successfully Created" });
  } catch (err) {
    res.status("500").send({ message: err.message });
  }
}

async function login(req, res) {
  const { username, password } = req.body;

  try {
    let user = await User.findOne({ username });
    if (!user) {
      res.status("400").send({ message: "Invalid Credentials" });
      return;
    }
    const user_password = await user.password;
    if (user_password != password) {
      res.status("400").send({ message: "Invalid Credentials" });
    }

    const token = await jwt.sign({
      _id: user._id,
      username: user.username,
      isAdmin: user.isAdmin
    }, process.env.JWT_SECRET_KEY)

    res.status(200).json({
      token: token,
      _id: user._id,
      username: user.username,
      isAdmin: user.isAdmin
    })
  } catch (exp) {
    res.status(500).send({ message: exp.message });
  }
}

module.exports = { login, registerMember };
