const express = require("express");
const router = express.Router();
const {authentication} = require("../middleware/isAuth")
const companyController = require("../controller/company");

router.post("/create", authentication, companyController.createCompany);
router.delete("/delete/:id", authentication, companyController.deleteCompany);
router.put("/update/:id", authentication, companyController.updateCompany);
router.get("/all",authentication, companyController.getAllCompanies)

module.exports = router;
