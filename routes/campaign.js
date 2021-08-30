const campaign = require("../controller/campaign");
const express = require("express");
const router = express.Router();
const { validation } = require("../middleware/validation");
const { authentication } = require("../middleware/isAuth");
const {
  addCampaignSchema,
  getByYearSchema,
  updateCampaignSchema,
} = require("../validation/campagin");

router.post(
  "/add",
  authentication,
  validation(addCampaignSchema),
  campaign.addCampaign
);

router.post(
  "/get-by-year",
  authentication,
  validation(getByYearSchema),
  campaign.campaginsByYear
);

router.post(
  "/get-excel",
  authentication,
  validation(getByYearSchema),
  campaign.getExcel
);

router.delete("/delete/:id", authentication, campaign.deleteCampaign);

router.post(
  "/get-all-inprogress-campaigns/:id",
  authentication,
  campaign.getAllInprogressCampaignsForASpecificCompany
);

router.post(
  "/get-all-completed-campaigns/:id",
  authentication,
  campaign.getAllCompleteCampaignsForASpecificCompany
);

router.patch(
  "/update/:id",
  authentication,
  validation(updateCampaignSchema),
  campaign.updateCampaign
);

router.get("/get-user-company", authentication, campaign.getUserCompany);

// router.post("/get-campagin", authentication, campagin.getCampagins);
// router.get("/detail/:id", authentication, campagin.campaginDetail);

module.exports = router;
