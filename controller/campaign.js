const { Campaign } = require("../models/campaign");
const Company = require("../models/company");
const User = require("../models/user");
const excel = require("exceljs");
const Exceptions = require("../utils/custom-exceptions");
const { promise } = require("../middleware/promise");

exports.addCampaign = promise(async (req, res) => {
  const body = req.body;

  const user = await User.findById(req.user._id);
  if (!user) throw new Exceptions.NotFound("User not found");

  const company = await Company.findOne({ creater: user._id });
  if (!company) throw new Exceptions.NotFound("Company not found");

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const date = new Date(body.startDate);
  const monthName = months[date.getMonth()];
  const year = date.getFullYear();

  function getWeek(date) {
    var days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      prefixes = ["1", "2", "3", "4", "5"];

    return prefixes[Math.floor(date.getDate() / 7)];
  }
  const week = getWeek(date);

  console.log(date);
  console.log(year);
  console.log(monthName);
  console.log(week);

  const newCampaign = new Campaign({
    ...body,
    companyId: company._id,
    year: year,
    monthName: monthName,
    week: week,
  });

  newCampaign.save();
  res
    .status(200)
    .json({ message: "Successfully added a new campaign", newCampaign });
});

exports.campaginsByYear = async (req, res) => {
  try {
    const { year, companyId } = req.body;

    const monthName = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const data = [];
    let dataObj = {};

    for (var i = 0; i < monthName.length; i++) {
      const S1 = await Campaign.find({
        year,
        companyId: companyId,
        monthName: monthName[i],
        week: "2",
        week: "1",
      });
      const S2 = await Campaign.find({
        year,
        companyId: companyId,
        monthName: monthName[i],
        week: "2",
      });
      const S3 = await Campaign.find({
        year,
        companyId: companyId,
        monthName: monthName[i],
        week: "3",
      });
      const S4 = await Campaign.find({
        year,
        companyId: companyId,
        monthName: monthName[i],
        week: "4",
      });
      dataObj.month = monthName[i];
      dataObj.S1 = S1;
      dataObj.S2 = S2;
      dataObj.S3 = S3;
      dataObj.S4 = S4;
      console.log(dataObj);
      data.push(dataObj);
      dataObj = {};
    }
    res.status("200").json({
      data,
    });
  } catch (err) {
    res.status("500").send({
      message: err.message,
    });
  }
};

exports.getExcel = async (req, res) => {
  try {
    const { year, companyId } = req.body;

    const monthName = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const data = [];
    let dataObj = {};

    for (var i = 0; i < monthName.length; i++) {
      const S1 = await Campaign.find({
        year,
        companyId: companyId,
        monthName: monthName[i],
        week: "2",
        week: "1",
      });
      const S2 = await Campaign.find({
        year,
        companyId: companyId,
        monthName: monthName[i],
        week: "2",
      });
      const S3 = await Campaign.find({
        year,
        companyId: companyId,
        monthName: monthName[i],
        week: "3",
      });
      const S4 = await Campaign.find({
        year,
        companyId: companyId,
        monthName: monthName[i],
        week: "4",
      });
      dataObj.month = monthName[i];
      dataObj.S1 = S1;
      dataObj.S2 = S2;
      dataObj.S3 = S3;
      dataObj.S4 = S4;
      data.push(dataObj);
      dataObj = {};
    }

    let workbook = new excel.Workbook();
    let worksheet = workbook.addWorksheet("campagins");

    worksheet.columns = [
      {
        header: "month",
        key: "month",
        width: 25,
      },
      {
        header: "S1",
        key: "S1",
        width: 25,
      },
      {
        header: "S2",
        key: "S2",
        width: 25,
      },
      {
        header: "S3",
        key: "S3",
        width: 25,
      },
      {
        header: "S4",
        key: "S4",
        width: 25,
      },
    ];
    worksheet.addRows(data);
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=" + "campagins.xlsx"
    );

    return workbook.xlsx.write(res).then(function () {
      res.status(200).end();
    });
  } catch (err) {
    res.status("500").send({
      message: err.message,
    });
  }
};

exports.deleteCampaign = promise(async (req, res) => {
  const { id } = req.params;
  const deleteCampaign = await Campaign.deleteOne({ _id: id });
  res.status(200).json({ message: "Successfully deleted campaign" });
});

exports.getAllInprogressCampaignsForASpecificCompany = promise(
  async (req, res) => {
    const { id } = req.params;

    const campaigns = await Campaign.find({ companyId: id, inProgress: true });
    if (!campaigns) throw new Exceptions.NotFound("No campaigns found");

    res.status(200).json({ campaigns });
  }
);

exports.getAllCompleteCampaignsForASpecificCompany = promise(
  async (req, res) => {
    const { id } = req.params;

    const campaigns = await Campaign.find({ companyId: id, completed: true });
    if (!campaigns) throw new Exceptions.NotFound("No campaigns found");

    res.status(200).json({ campaigns });
  }
);

exports.updateCampaign = promise(async (req, res) => {
  const { id } = req.params;
  const updateCampaign = await Campaign.updateOne(
    { _id: id },
    {
      $set: {
        ...req.body,
      },
    }
  );

  const campaign = await Campaign.findById(id);
  if (!campaign) throw new Exceptions.NotFound("No campaign found");

  res.status(200).json({ message: "Successfully updated campaign", campaign });
});

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

// async function getCampagins(req, res) {
//   try {
//     const { company } = req.body;
//     const companyObj = await Company.findOne({
//       company,
//     });
//     // console.log(user)
//     const inProgress_compagins = await Campaign.find({
//       company: companyObj._id,
//       isComplete: false,
//     });
//     const done_compagins = await Campaign.find({
//       company: companyObj._id,
//       isComplete: true,
//     });
//     for (var i = 0; i < done_compagins.length; i++) {
//       const obj = done_compagins[i];
//       const actionArray = obj.actions;
//       delete obj.actions;
//       const actionObjs = [];
//       for (var j = 0; j < actionArray.length; j++) {
//         let action = await Action.findById({
//           _id: actionArray[j],
//         }).select("action_type");
//         actionObjs.push(action);
//       }

//       const obj2 = {
//         actions: actionObjs,
//       };
//       done_compagins[i] = {
//         ...obj._doc,
//         ...obj2,
//       };
//     }
//     res.status("200").json({
//       inProgress: inProgress_compagins,
//       complete: done_compagins,
//     });
//   } catch (err) {
//     res.send({
//       message: err.message,
//     });
//   }
// }

// async function campaginDetail(req, res) {
//   try {
//     const { id } = req.params;
//     const campagin = await Campaign.findById({
//       _id: id,
//     });
//     const actions = campagin.actions;
//     const channelArray = [];
//     const actionArray = [];
//     for (var i = 0; i < actions.length; i++) {
//       let action_id = actions[i];
//       let action = await Action.findById({
//         _id: action_id,
//       });
//       let channels = action.channels;
//       for (var j = 0; j < channels.length; j++) {
//         let channel_id = channels[j];
//         let channel = await Channel.findById({
//           _id: channel_id,
//         });
//         channelArray.push(channel);
//       }
//       let channelObj = {
//         channels: channelArray,
//       };
//       let actionObj = {
//         ...action._doc,
//         ...channelObj,
//       };
//       actionArray.push(actionObj);
//     }
//     delete campagin.actions;
//     const actionsObj = {
//       actions: actionArray,
//     };

//     res.json({
//       ...campagin._doc,
//       ...actionsObj,
//     });
//   } catch (err) {
//     res.json({
//       message: err.message,
//     });
//   }
// }

// module.exports = {
//   getCampagins,
//   campaginDetail,
// };
