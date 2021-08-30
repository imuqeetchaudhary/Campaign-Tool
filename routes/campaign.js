const actionController = require("../controller/actions");
const campagin = require("../controller/campaign");
const express = require("express");
const router = express.Router();
const { validation } = require("../middleware/validation")
const { authentication } = require("../middleware/isAuth");
const { campaginSchema, actionSchema } = require("../validation/campagin")


router.delete("/delete-campagin/:id", authentication, campagin.deleteCampagin);
router.post('/create-campagin', authentication, campagin.createCampagin)
router.put("/update-campagin/:id", authentication, campagin.updateCampagin);
router.post("/create-action", authentication, actionController.createAction);
router.delete("/action-delete/:id", authentication,actionController.deleteAction);
router.put("/action-update/:id", authentication, actionController.updateAction);
router.post("/get-campagin", authentication, campagin.getCampagins);
router.get("/detail/:id", authentication,campagin.campaginDetail);
router.post("/marketing-plan", authentication,campagin.campaginsByYear);
router.get("/get-excel", authentication, campagin.getExcelReport)

module.exports = router;
