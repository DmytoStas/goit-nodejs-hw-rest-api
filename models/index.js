const fs = require("fs/promises");
const path = require("path");

const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);

  return JSON.parse(data);
}

async function getContactById(contactId) {
  const contactsList = await listContacts();
  const contact = contactsList.find((contact) => contact.id === contactId);

  return contact || null;
}

async function removeContact(contactId) {
  const contactsList = await listContacts();
  const index = contactsList.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }

  const [result] = contactsList.splice(index, 1);

  await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));

  return result;
}

async function addContact(data) {
  const contactsList = await listContacts();
  const newContact = {
    id: nanoid(),
    ...data,
  };

  contactsList.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));

  return newContact;
}

const updateContact = async (contactId, data) => {
  const conatcts = await listContacts();
  const index = conatcts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  conatcts[index] = { id: contactId, ...data };
  await fs.writeFile(contactsPath, JSON.stringify(conatcts, null, 2));

  return conatcts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
