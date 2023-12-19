const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/yogaDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a schema for the user data
const userSchema = new mongoose.Schema({
  fullName: String,
  age: Number,
  selectedBatch: String,
});

const UserModel = mongoose.model("User", userSchema);

app.use(bodyParser.json());

// API endpoint for form submission
app.post("/api/submitForm", async (req, res) => {
  try {
    // Validate user data
    const { fullName, age, selectedBatch } = req.body;
    if (!fullName || !age || !selectedBatch) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    // Store data in MongoDB
    const newUser = new UserModel({ fullName, age, selectedBatch });
    await newUser.save();

    // Simulate payment processing (assuming CompletePayment is a mock function)
    const paymentResponse = CompletePayment({ user: newUser });

    // Return response to the frontend based on payment status
    if (paymentResponse.success) {
      res.json({
        success: true,
        message: "Form submitted successfully and payment processed",
      });
    } else {
      res.json({
        success: false,
        message: "Form submitted, but payment failed",
      });
    }
  } catch (error) {
    console.error("Error processing form submission:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
