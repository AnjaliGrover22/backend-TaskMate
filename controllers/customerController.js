const mongoose = require("mongoose");
const Customer = require("../schemas/Customer");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "1d" });
};
// login Customer
const loginCustomer = async (req, res) => {
  const { email, password } = req.body;

  try {
    const customer = await Customer.login(email, password);

    // Create token
    const token = createToken(customer._id);

    // Return firstName along with email and token
    res.status(200).json({
      email: customer.email,
      firstName: customer.firstName,
      profileImage: customer.profileImage,
      token,
      id: token._id,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signUpCustomer
const signUpCustomer = async (req, res) => {
  const {
    profileImage,
    firstName,
    lastName,
    gender,
    email,
    password,
    phoneNumber,
    address,
    aboutMe,
  } = req.body;

  try {
    const customer = await Customer.signup(
      profileImage,
      firstName,
      lastName,
      gender,
      email,
      password,
      phoneNumber,
      address,
      aboutMe
    );

    // Create token
    const token = createToken(customer._id);

    // Return firstName along with email and token
    res.status(200).json({
      email: customer.email,
      firstName: customer.firstName,
      profileImage: customer.profileImage,
      token,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get Customer by ID
const getCustomerById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid customer ID" });
  }

  try {
    const customer = await Customer.findById(id);

    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Customer
const updateCustomer = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid customer ID" });
  }

  try {
    const customer = await Customer.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const uploadCustomerImage = async (req, res) => {
  try {
    const { id } = req.params;

    // Ensure the customer exists before attempting to upload the image
    const customer = await Customer.findById(id);
    if (!customer) {
      return res.status(404).json({ message: "customer not found" });
    }

    // Check if the file was uploaded correctly by multer
    if (req.file && req.file.path) {
      // Update only the image field, avoiding validation of other fields
      customer.profileImage = req.file.path;
      await customer.save({ validateBeforeSave: false }); // Avoid validation for other fields like categoryId

      return res
        .status(200)
        .json({ message: "profileImage uploaded successfully", customer });
    } else {
      console.log(req.file); // Add this log to see what req.file looks like
      return res
        .status(422)
        .json({ message: "Invalid profileImage or no file uploaded" });
    }
  } catch (error) {
    console.error("Error while uploading customer profileImage:", error); // Log the error to the console
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  loginCustomer,
  signUpCustomer,
  getCustomerById,
  updateCustomer,
  uploadCustomerImage,
};
