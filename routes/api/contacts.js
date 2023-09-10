const express = require("express");

const controllers = require("../../controllers/contacts");

const { validateBody } = require("../../middlewares");

const schemas = require("../../schemas/contacts");

const router = express.Router();

router.get("/", controllers.getAll);

router.get("/:contactId", controllers.getById);

router.post("/", validateBody(schemas.addSchema), controllers.addNewContact);

router.put(
  "/:contactId",
  validateBody(schemas.addSchema),
  controllers.updateById
);

router.delete("/:contactId", controllers.deleteById);

module.exports = router;
