const mongoose = require("mongoose");

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI);
  console.log(`MongoDB Connected to : ${conn.connection.name}`.underline.cyan);
};

module.exports = connectDB;
