const { httpError } = require("../helpers");

const validateBody = () => {
  const func = (req, _, next) => {
    if (Object.keys(req.body).length === 0) {
      next(httpError(400, "Missing fields"));
    }
    next();
  };

  return func;
};

module.exports = validateBody;
