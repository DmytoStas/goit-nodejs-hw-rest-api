const { Contact } = require("../models/contacts");
const { httpError, controllerWrapper } = require("../helpers");

const getAll = async (_, res) => {
  const result = await Contact.find({}, "-createdAt -updatedAt");
  res.json(result);
};

const getById = async (req, res) => {
  const { contactId } = req.params;

  const result = await Contact.findById({ _id: contactId });

  if (!result) {
    throw httpError(404, "Not found!");
  }

  res.json(result);
};

const addNewContact = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate({ _id: contactId }, req.body, {
    new: true,
  });
  if (!result) {
    throw httpError(404, "Not found!");
  }

  res.json(result);
};

const updateFavorite = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate({ _id: contactId }, req.body, {
    new: true,
  });
  if (!result) {
    throw httpError(404, "Not found!");
  }

  res.json(result);
};

const deleteById = async (req, res) => {
  const { contactId } = req.params;

  const result = await Contact.findByIdAndRemove({ _id: contactId });
  if (!result) {
    throw httpError(404, "Not found!");
  }

  res.json({
    message: "Deleted successfully",
  });
};

module.exports = {
  getAll: controllerWrapper(getAll),
  getById: controllerWrapper(getById),
  addNewContact: controllerWrapper(addNewContact),
  updateById: controllerWrapper(updateById),
  updateFavorite: controllerWrapper(updateFavorite),
  deleteById: controllerWrapper(deleteById),
};
