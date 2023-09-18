const express = require("express");

const controllers = require("../../controllers/contacts");

const {
  validateBody,
  validateBodyElements,
  isValidId,
  authenticate,
} = require("../../middlewares");

const { User } = require("../../models/user");

const { schemas } = require("../../models/contacts");

const router = express.Router();

router.get("/", authenticate(User), controllers.getAll);

router.get("/:contactId", authenticate(User), isValidId, controllers.getById);

router.post(
  "/",
  authenticate(User),
  validateBodyElements(schemas.addSchema),
  controllers.addNewContact
);

router.put(
  "/:contactId",
  authenticate(User),
  isValidId,
  validateBody(),
  validateBodyElements(schemas.addSchema),
  controllers.updateById
);

router.patch(
  "/:contactId/favorite",
  authenticate(User),
  isValidId,
  validateBodyElements(schemas.updateFavoriteSchema),
  controllers.updateFavorite
);

router.delete(
  "/:contactId",
  authenticate(User),
  isValidId,
  controllers.deleteById
);

module.exports = router;
