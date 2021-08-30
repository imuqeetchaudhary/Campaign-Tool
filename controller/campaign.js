const Campaign = require("../models/campaign");
const Company = require("../models/company")
const Action = require("../models/actions");
const Channel = require("../models/channel");
const User = require("../models/user");
const excel = require("exceljs");

async function createCampagin(req, res) {
  const { thematic, campaign_type, start_date, end_date, isComplete, note, actions, company,
  } = req.body;

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
  const date = new Date(start_date);
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

  console.log(week);
  try {
    let campaign = new Campaign({
      thematic: thematic,
      campaign_type: campaign_type,
      start_date: start_date,
      end_date: end_date,
      isComplete: isComplete,
      note: note,
      actions: actions,
      company: company,
      month: monthName,
      year: year,
      week: week,
    });
    campaign = await campaign.save();
    res
      .status("200")
      .json({ message: "Campaign Created Successfully", campaign });
  } catch (err) {
    res.send({ message: err.message });
  }
}

async function updateCampagin(req, res) {
  try {
    const { id } = req.params;
    const newCampaginValues = { $set: { ...req.body } };
    const campagin = await Campaign.updateOne({ _id: id }, newCampaginValues);
    res.send({ message: "Campagin Updated Successfully", campagin });
  } catch (err) {
    res.send({ message: err.message });
  }
}

async function deleteCampagin(req, res) {
  try {
    const { id } = req.params;
    await Campaign.findByIdAndDelete({ _id: id });
    res.send({ message: "Successfully Deleted" });
  } catch (err) {
    res.send({ message: err.message });
  }
}

async function getCampagins(req, res) {
  try {
    const { company } = req.body;
    const companyObj = await Company.findOne({ company });
    // console.log(user)
    const inProgress_compagins = await Campaign.find({
      company: companyObj._id,
      isComplete: false,
    });
    const done_compagins = await Campaign.find({
      company: companyObj._id,
      isComplete: true,
    });
    for (var i = 0; i < done_compagins.length; i++) {
      const obj = done_compagins[i];
      const actionArray = obj.actions;
      delete obj.actions;
      const actionObjs = [];
      for (var j = 0; j < actionArray.length; j++) {
        let action = await Action.findById({ _id: actionArray[j] }).select(
          "action_type"
        );
        actionObjs.push(action);
      }

      const obj2 = { actions: actionObjs };
      done_compagins[i] = { ...obj._doc, ...obj2 };
    }
    res
      .status("200")
      .json({ inProgress: inProgress_compagins, complete: done_compagins });
  } catch (err) {
    res.send({ message: err.message });
  }
}

async function campaginDetail(req, res) {
  try {
    const { id } = req.params;
    const campagin = await Campaign.findById({ _id: id });
    const actions = campagin.actions;
    const channelArray = [];
    const actionArray = [];
    for (var i = 0; i < actions.length; i++) {
      let action_id = actions[i];
      let action = await Action.findById({ _id: action_id });
      let channels = action.channels;
      for (var j = 0; j < channels.length; j++) {
        let channel_id = channels[j];
        let channel = await Channel.findById({ _id: channel_id });
        channelArray.push(channel);
      }
      let channelObj = { channels: channelArray };
      let actionObj = { ...action._doc, ...channelObj };
      actionArray.push(actionObj);
    }
    delete campagin.actions;
    const actionsObj = { actions: actionArray };

    res.json({ ...campagin._doc, ...actionsObj });
  } catch (err) {
    res.json({ message: err.message });
  }
}

async function campaginsByYear(req, res) {
  try {
    const { year, company } = req.body;

    const companyObj = await Company.findOne({ company });
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
    console.log(monthName[0]);
    const data = [];
    let dataObj = {};

    for (var i = 0; i < monthName.length; i++) {
      const S1 = await Campaign.find({
        year,
        company: companyObj._id,
        month: monthName[i],
        week: "2",
        week: "1"
      }).select(
        "-month -year -week"
      );
      const S2 = await Campaign.find({
        year,
        company: companyObj._id,
        month: monthName[i],
        week: "2",
      }).select("-month -year -week");
      const S3 = await Campaign.find({
        year,
        company: companyObj._id,
        month: monthName[i],
        week: "3",
      }).select("-month -year -week");
      const S4 = await Campaign.find({
        year,
        company: companyObj._id,
        month: monthName[i],
        week: "4",
      }).select("-month -year -week");
      dataObj.month = monthName[i];
      dataObj.S1 = S1;
      dataObj.S2 = S2;
      dataObj.S3 = S3;
      dataObj.S4 = S4;
      data.push(dataObj);
      dataObj = {};
    }
    // if(year){
    //   const start_range = year.concat("-01-01");
    //   const end_range = year.concat("-12-31");
    // }

    //   const user = await User.findOne({ company });
    // let campagins = []
    // if(year && company){
    //   campagins = await Campaign.find({
    //    year,company:ucompanyObj_id
    //   });
    // }

    // for (var i = 0; i < campagins.length; i++) {
    //   const campagin = campagins[i];
    //   const actionArray = campagin.actions;
    //   delete campagin.actions;
    //   const actionObjs = [];
    //   const channelObjs = [];
    //   for (var j = 0; j < actionArray.length; j++) {
    //     const id = actionArray[j]
    //     let action = await Action.findById({ _id: id }).select(
    //       "action_type channels"
    //     );
    //     const channelsArray = action.channels;
    //     delete action.channels;
    //     for (var k = 0; k < channelsArray.length; k++) {
    //       let channel = await Channel.findById({
    //         _id: channelsArray[k],
    //       }).select("cost");
    //       channelObjs.push(channel);
    //     }
    //     const obj1 = { action_type: action.action_type, channels: channelObjs };

    //     actionObjs.push(obj1);
    //   }

    //   const obj2 = { actions: actionObjs };
    //   campagins[i] = { ...campagin._doc, ...obj2 };
    // }

    res.status("200").json({ data });
  } catch (err) {
    res.status("500").send({ message: err.message });
  }
}

async function getExcelReport(req, res) {
  try {
    const { year, company } = req.body;

    const companyObj = await Company.findOne({ company });
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
    console.log(monthName[0]);
    const data = [];
    let dataObj = {};

    for (var i = 0; i < monthName.length; i++) {
      const S1 = await Campaign.find({
        year,
        company: companyObj._id,
        month: monthName[i],
        week: "1"
      }).select(
        "-month -year -week"
      );
      const S2 = await Campaign.find({
        year,
        company: companyObj._id,
        month: monthName[i],
        week: "2",
      }).select("-month -year -week");
      const S3 = await Campaign.find({
        year,
        company: companyObj._id,
        month: monthName[i],
        week: "3",
      }).select("-month -year -week");
      const S4 = await Campaign.find({
        year,
        company: companyObj._id,
        month: monthName[i],
        week: "4",
      }).select("-month -year -week");
      dataObj.month = monthName[i];
      dataObj.S1 = S1;
      dataObj.S2 = S2;
      dataObj.S3 = S3;
      dataObj.S4 = S4;
      data.push(dataObj);
      dataObj = {};
    }
    // res.json(data);

    let workbook = new excel.Workbook();
    let worksheet = workbook.addWorksheet("campagins");

    worksheet.columns = [
      { header: "month", key: "month", width: 25 },
      // { header: "", key: "", width: 25 },
      { header: "S1", key: "S1", width: 25 },
      { header: "S2", key: "S2", width: 25 },
      { header: "S3", key: "S3", width: 25 },
      { header: "S4", key: "S4", width: 25 },
      // { header: "Action on the whole month", key: "S4", width: 25 },
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
    res.send({ message: err.message });
  }
}

module.exports = {
  createCampagin,
  updateCampagin,
  deleteCampagin,
  getCampagins,
  campaginDetail,
  campaginsByYear,
  getExcelReport,
};
