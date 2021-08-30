const yup = require("yup");

exports.addCampaignSchema = yup.object({
  campaignType: yup.string().required(),
  thematic: yup.string().required(),
  startDate: yup.date().required(),
  endDate: yup.date().required(),
});

exports.getByYearSchema = yup.object({
  companyId: yup.string().required(),
  year: yup.string().required(),
});

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

exports.updateCampaignSchema = yup.object({
  campaignType: yup.string(),
  thematic: yup.string(),
  startDate: yup.date(),
  endDate: yup.date(),
});