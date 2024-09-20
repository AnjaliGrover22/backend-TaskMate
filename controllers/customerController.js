const Customer = require("../schemas/Customer");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "1d" });
};

// login Customer
const loginCustomer = async (req, res) => {
  const { email, password } = req.body;

  try {
    const customer = await Customer.login(email, password);

    //create token
    const token = createToken(customer._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// sign up Customer
const signUpCustomer = async (req, res) => {
  const { email, password } = req.body;

  try {
    const customer = await Customer.signup(email, password);
    //create token
    const token = createToken(customer._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { loginCustomer, signUpCustomer };
