const contacts = require("../models");
const { httpError, controllerWrapper } = require("../helpers");

const getAll = async (_, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (e) {
    next(e);
  }
};

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const result = await contacts.getContactById(contactId);

    if (!result) {
      throw httpError(404, "Not found!");
    }

    res.json(result);
  } catch (e) {
    next(e);
  }
};

const addNewContact = async (req, res, next) => {
  try {
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  } catch (e) {
    next(e);
  }
};

const updateById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.updateContact(contactId, req.body);
    if (!result) {
      throw httpError(404, "Not fount!");
    }

    res.json(result);
  } catch (e) {
    next(e);
  }
};

const deleteById = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const result = await contacts.removeContact(contactId);
    if (!result) {
      throw httpError(404, "Not fount!");
    }

    res.json({
      message: "Deleted successfully",
    });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAll: controllerWrapper(getAll),
  getById: controllerWrapper(getById),
  addNewContact: controllerWrapper(addNewContact),
  updateById: controllerWrapper(updateById),
  deleteById: controllerWrapper(deleteById),
};
