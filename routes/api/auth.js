const express = require("express");

const controllers = require("../../controllers/auth");

const {
  validateBody,
  validateBodyElements,
  authenticate,
  upload,
} = require("../../middlewares");

const { schemas } = require("../../models/user");

const { User } = require("../../models/user");

const router = express.Router();

router.post(
  "/register",
  validateBody(),
  validateBodyElements(schemas.authSchema),
  controllers.register
);

router.post(
  "/login",
  validateBody(),
  validateBodyElements(schemas.authSchema),
  controllers.login
);

router.post("/logout", authenticate(User), controllers.logout);

router.get("/current", authenticate(User), controllers.getCurrent);

router.patch(
  "/",
  authenticate(User),
  validateBodyElements(schemas.updateSubscriptionSchema),
  controllers.updateSubscription
);

router.patch(
  "/avatars",
  authenticate(User),
  upload.single("avatar"),
  controllers.updateAvatar
);

router.get("/verify/:verificationToken", controllers.verifyEmail);

router.post(
  "/verify",
  validateBodyElements(schemas.emailSchema),
  controllers.resendVerifyEmail
);

module.exports = router;
