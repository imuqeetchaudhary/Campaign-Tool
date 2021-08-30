const yup = require("yup");

exports.compaginSchema = yup.object({
  thematic: yup.string(),
  company_type: yup.string(),
  start_date: yup.date(),
  end_date: yup.date(),
});

exports.ActionSchema = yup.object({
  action_type: yup.string(),
  target: yup.string(),
});
 