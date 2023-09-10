const express = require("express");

const controllers = require("../../controllers/contacts");

const { validateBody, validateBodyElements } = require("../../middlewares");

const schemas = require("../../schemas/contacts");

const router = express.Router();

router.get("/", controllers.getAll);

router.get("/:contactId", controllers.getById);

router.post(
  "/",
  validateBody(),
  validateBodyElements(schemas.addSchema),
  controllers.addNewContact
);

router.put(
  "/:contactId",
  validateBodyElements(schemas.addSchema),
  controllers.updateById
);

router.delete("/:contactId", controllers.deleteById);

module.exports = router;
