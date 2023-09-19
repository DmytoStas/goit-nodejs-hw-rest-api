const { Schema, model } = require("mongoose");

const Joi = require("joi");

const { handleMongooseError } = require("../middlewares");

const { emailRegexp, subscriptionList } = require("../constants/authConst");

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      match: emailRegexp,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: subscriptionList,
      default: "starter",
    },
    token: {
      type: String,
      default: "",
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const authSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    "any.required": "Missing required email field",
  }),
  password: Joi.string().min(4).required().messages({
    "any.required": "Missing required password field",
  }),
});

const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid(...subscriptionList)
    .required()
    .messages({
      "any.only":
        "Invalid subscription plan. It can be [starter, pro, business] only",
      "any.required": "Missing field subscription",
    }),
});

const schemas = {
  authSchema,
  updateSubscriptionSchema,
};

const User = model("user", userSchema);

module.exports = { User, schemas };
