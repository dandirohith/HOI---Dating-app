const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    batch: {
      type: String,
      required: [true, "Please add a batch"],
    },
    major: {
      type: String,
      required: [true, "Please add a major"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add an password"],
    },
    gender: {
      type: String,
      required: [true, "Please add an gender"],
      enum: ["male", "female"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
