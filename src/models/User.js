const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    serverId: {
      type: String,
      required: true,
      validate: (data) => data.length > 5,
    },

    userId: {
      type: String,
      required: true,
    },

    timezone: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
