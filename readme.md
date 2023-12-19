# phonebook-api

## Overview

**phonebook-api** is the backend for the Phonebook application. This API provides endpoints for managing users and a contact list, including user authentication, updating user avatar/subscription and user verification by email.

## Usage

To get started with using the API, you can use the hosted version of the project by following the `https://phonebook-api-qii3.onrender.com/ + chosen endpoint`. First, the user needs to be authorized and email must be verified, as all other functionality is protected.

### Local Usage

Alternatively, instead of using the hosted version of the product, the API can be run locally. To run this project locally, follow these steps:

1. Clone the repository to your local machine.
2. Update the `.env` file with the necessary variables as described in `env.example`.
3. Install the necessary dependencies using the following command:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm start
   ```

5. Open your Postman application and go to `http://localhost:3000 + chosen endpoint`.

## Endpoints

### `/users`

- `POST` - `/register`: Receives the body with required fields: `email`, `password`. Returns `{user: {email, subscription}}`

- `POST` - `/login`: Receives the body with required fields: `email`, `password`. Returns `{token, user: {email, subscription}}`

- `POST` - `/logout`: Returns status `204` for successful logout

- `GET` - `/current`: Check the current user. Returns `{email, subscription}`

- `PATCH` - `/`: Update subscription. Receives the body with required field `subscription`. Returns `{email, subscription}`

- `PATCH` - `/avatars`: Receives the from data with the required field `avatar`. Returns `{avatarURL}`

- `POST` - `/verify`: It exists to request email re-verification. Receives the body with required field `email`. Returns a message about success

- `GET` - `/verify/:verificationToken`: Expects a dynamic parameter `verificationToken`. Returns a message about success

### `/api/contacts`

- `GET` - `/`: Expects query params `{ page, limit, favorite }`. Returns paginated elements with the option of filtering by `favorite`

- `GET` - `/:contactId`: Expects a dynamic parameter `contactId`. Returns founded item

- `POST` - `/`: Receives the body with required fields: `name`, `email`, `phone`. Returns an object of **created** contact `{name, email, phone, favorite, owner, _id, createdAt, updatedAt}`

- `PUT` - `/:contactId`: Expects a dynamic parameter `contactId` and receives the body with required fields: `name`, `email`, `phone`. Returns an object of **updated** contact

- `PATCH` - `/:contactId/favorite`: Expects a dynamic parameter `contactId` and receives the body with required field `favorite`. Returns uptaded contact

- `DELETE` - `/:contactId`: Expects a dynamic parameter `contactId`. Returns a message success

## Technologies Used

- Node.js
- JavaScript
- Express.js
- MongoDB
- Mongoose
- JWT
- Sendgrid
- Joi
- Multer
- Gravatar
