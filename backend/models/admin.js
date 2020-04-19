const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
    username: {type: String, unique: true, required: true},
    email: String,
    password: String,
    firstName: String,
    lastName: String
});

module.exports = mongoose.model("Admin", adminSchema);