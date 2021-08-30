exports.validation = (schema) => async (req, res, next) => {
  const body = req.body;
  try {
    await schema.validate(body, { abortEarly: false });
    next();
  } catch (err) {
    console.log("validation error: ", err);

    res.status(422).json({
      message: err.errors,
    });
  }
};
