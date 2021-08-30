const userController = require("../controller/user");
const express = require("express");
const router = express.Router();
const { authentication } = require("../middleware/isAuth")

router.get("/all", authentication, userController.getUsers);
router.put("/update/:id", authentication, userController.updateUser);
router.get("/:id", authentication, userController.userDetail);
router.delete("/delete/:id", authentication, userController.deleteUser);
router.put("/add/company-access", authentication, userController.addCompanyAccess)
router.post("/send-mail", authentication, userController.requestAccess)

module.exports = router;
