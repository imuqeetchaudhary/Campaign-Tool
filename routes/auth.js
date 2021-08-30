const authController = require("../controller/auth")
const express = require("express")
const router = express.Router()
const { validation } = require("../middleware/validation")
const { registerSchema, loginSchema } = require("../validation/user")


router.post('/register', validation(registerSchema),authController.registerMember)
router.post('/login', validation(loginSchema),authController.login)

module.exports = router