const express = require("express");

const controllers = require("../../controllers/auth");

const {
  validateBody,
  validateBodyElements,
  authenticate,
} = require("../../middlewares");

const { schemas } = require("../../models/user");

const { User } = require("../../models/user");

const router = express.Router();

router.post(
  "/users/register",
  validateBody(),
  validateBodyElements(schemas.authSchema),
  controllers.register
);

router.post(
  "/users/login",
  validateBody(),
  validateBodyElements(schemas.authSchema),
  controllers.login
);

router.post("/users/logout", authenticate(User), controllers.logout);

router.get("/users/current", authenticate(User), controllers.getCurrent);

router.patch(
  "/users",
  authenticate(User),
  validateBodyElements(schemas.updateSubscriptionSchema),
  controllers.updateSubscription
);

module.exports = router;
