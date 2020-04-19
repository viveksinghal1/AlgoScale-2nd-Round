const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {type: String, unique: true, required: true},
    email: String,
    firstName: String,
    lastName: String
});

module.exports = mongoose.model("User", userSchema);