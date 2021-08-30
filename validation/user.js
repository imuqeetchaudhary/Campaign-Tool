const yup = require("yup")

exports.registerSchema = yup.object({
    username: yup.string().required(),
    // company: yup.string().required(),
    password: yup.string().required().min(5)
})

exports.loginSchema = yup.object({
    username: yup.string().required(),
    password: yup.string().required()
})

