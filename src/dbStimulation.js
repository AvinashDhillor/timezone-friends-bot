//first need to load  dotenv .. because it have connection string
require("dotenv").config();

// now laod db connection library... we just have to load it
require("./db/connection"); //? this will make our connection

// Now import Schema to perform operation on database
const User = require("./models/User");

// Now we can perfrom CRUD operation for all users......

// Create USer (C)
let newUserData = {
  serverId: "234323",
  userId: "4244",
  timezone: "Asia/china",
};
const user = new User(newUserData);

// now for saving it..
user
  .save()
  .then((data) => console.log("User is saved ", JSON.stringify(data)))
  .catch((err) => console.log("failed to insert data"));

//? Accessing all data
// User.find().then((data) => {
//   console.log(data);
// });

//? get usertimezone from serverId and userID
// let filter = {
//   serverId: "123",
//   userId: "4244",
// };
// User.findOne(filter).then((data) => console.log("Found user", data));

//?
// let newData = {
//   timezone: "Asia/iran",
// };

// let filter = {
//   serverId: "123",
//   userId: "4244",
// };

// User.findOneAndUpdate(filter, { $set: newData }, { new: true }).then((data) => {
//   console.log("Updated ", data);
// });
