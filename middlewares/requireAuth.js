// Middlewares/requireAuth.js
const jwt = require("jsonwebtoken");
const Customer = require("../schemas/Customer");
const Professional = require("../schemas/Professional");

const requireAuth = async (req, res, next) => {
  // Get the token from authorization header
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Not Authorized, No token" });
  }

  // Extract the token, assuming 'Bearer <token>'
  const token = authorization.split(" ")[1];

  try {
    // Verify the token
    const { _id } = jwt.verify(token, process.env.SECRET);

    // Search for the user in the Customer collection
    const customer = await Customer.findById(_id).select("_id");
    if (customer) {
      req.user = { type: "customer", _id: customer._id };
      return next();
    }

    // If not found in Customer, search in Professional collection
    const professional = await Professional.findById(_id).select("_id");
    if (professional) {
      req.user = { type: "professional", _id: professional._id };
      return next();
    }

    // If no user is found
    return res.status(401).json({ error: "User not found" });
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: "Not Authorized" });
  }
};

module.exports = requireAuth;
