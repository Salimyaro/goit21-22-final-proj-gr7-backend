const express = require("express");
const router = express.Router();
const guard = require("../../../helpers/guard");
const userInfo = require("../../../controllers/userInfo");

router.get("/user", guard, userInfo.info);

module.exports = router;
