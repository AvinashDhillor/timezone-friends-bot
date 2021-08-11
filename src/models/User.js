const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    serverId: {
      type: String,
      required: true,
      min: 3,
    },

    userId: {
      type: String,
      required: true,
      min: 3,
    },

    timezone: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.methods.toJSON = function () {
  const user = this;
  let userObject = user.toObject();
  delete userObject["_id"];
  delete userObject["__v"];
  delete userObject["createdAt"];
  delete userObject["updatedAt"];
  return userObject;
};

userSchema.statics.insertOrUpdate = function (serverId, userId, timezone) {
  var User = this;
  return new Promise((resolve, reject) => {
    User.findOne({ serverId, userId }).then((data) => {
      if (!data) {
        let newUser = new User({ serverId, userId, timezone });
        newUser
          .save()
          .then((newUserData) => {
            return resolve(newUserData.toJSON());
          })
          .catch((err) => reject(err));
      } else {
        User.findOneAndUpdate(
          { serverId, userId },
          { $set: { timezone } },
          { new: true }
        )
          .then((updatedUserData) => {
            return resolve(updatedUserData.toJSON());
          })
          .catch((err) => {
            return reject(err);
          });
      }
    });
  });
};

userSchema.statics.findByServerAndUserId = function (serverId, userId) {
  var User = this;
  return new Promise((resolve, reject) => {
    User.findOne({ serverId, userId })
      .then((data) => {
        if (!data) {
          return reject();
        }
        return resolve(data.toJSON());
      })
      .catch((err) => {
        return reject(err);
      });
  });
};

const User = mongoose.model("User", userSchema);

module.exports = User;
