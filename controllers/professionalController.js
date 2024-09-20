// controllers/professionalController.js
const Professional = require("../schemas/Professional");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "1d" });
};

// Login Professional
const loginProfessional = async (req, res) => {
  const { email, password } = req.body;

  try {
    const professional = await Professional.login(email, password);

    // Create token
    const token = createToken(professional._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Sign up Professional
const signUpProfessional = async (req, res) => {
  const { email, password } = req.body;

  try {
    const professional = await Professional.signup(email, password);

    // Create token
    const token = createToken(professional._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { loginProfessional, signUpProfessional };
