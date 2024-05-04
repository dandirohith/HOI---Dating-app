// stores user id ,
// user's image names(imgid in s3 bucket)
// user's no of likes (rank by likes)
// matched or unmatched

const mongoose = require("mongoose");

const dateProfileSchema = new mongoose.Schema(
  {
    profileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    imageNames: [
      {
        type: String,
      },
    ],
    rank: {
      type: Number,
      default: 0,
      index: -1,
    },
    matched: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("dateProfile", dateProfileSchema);
