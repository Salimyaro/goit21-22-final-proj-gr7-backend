const express = require("express");
const router = express.Router();

const userController = require("../../../demo-controllers/users");
const guard = require("../../../demo-helpers/guard");
const upload = require("../../../demo-helpers/upload");
const validate = require("./validation");
const {
  createAccountLimiter,
} = require("../../../demo-helpers/rate-limit-reg");

router.post(
  "/auth/register",
  createAccountLimiter,
  validate.user,
  userController.reg
);
router.post("/auth/login", validate.user, userController.login);
router.post("/auth/logout", guard, userController.logout);
router.get("/current", guard, userController.current);
// router.patch(
//   "/",
//   [guard, validate.subscriptionUpdate],
//   userController.updateSubscription
// );
router.patch(
  "/avatars",
  [guard, upload.single("avatar"), validate.uploadAvatar],
  userController.avatars
);
router.get("/auth/verify/:verificationToken", userController.verifyToken);
module.exports = router;
