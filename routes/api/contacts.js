const express = require("express");

const controllers = require("../../controllers/contacts");

const {
  validateBody,
  validateBodyElements,
  isValidId,
} = require("../../middlewares");

const { schemas } = require("../../models/contacts");

const router = express.Router();

router.get("/", controllers.getAll);

router.get("/:contactId", isValidId, controllers.getById);

router.post(
  "/",
  validateBodyElements(schemas.addSchema),
  controllers.addNewContact
);

router.put(
  "/:contactId",
  isValidId,
  validateBody(),
  validateBodyElements(schemas.addSchema),
  controllers.updateById
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBodyElements(schemas.updateFavoriteSchema),
  controllers.updateFavorite
);

router.delete("/:contactId", isValidId, controllers.deleteById);

module.exports = router;
