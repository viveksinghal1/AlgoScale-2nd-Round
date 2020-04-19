const express = require("express");
const jwt = require("jsonwebtoken");
const cryptoJS = require("crypto-js");
const fs = require("fs");
const Admin = require("../models/admin");
const middleware = require("../middleware/index");
let router = express.Router();

const RSA_PRIVATE_KEY = fs.readFileSync("./keys/private.key");

router.post("/register", async function(req, res){
    try {
        let user1 = await User.findOne({ username: req.body.username });
        let user2 = await User.findOne({ email: req.body.email });
        if (user1) {
            res.status(409).send("This username is already registered");
        } else if (user2) {
            res.status(409).send("This email-id is already registered");
        } else {
            let encryptedPassword = cryptoJS.SHA256(req.body.password);
            let admin = new Admin({
                username: req.body.username,
                password: encryptedPassword,
                email: req.body.email,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
            });
            let registeredAdmin =  await admin.save();
            try {
                let payload = { subject: registeredAdmin._id };
                let token = jwt.sign(payload, RSA_PRIVATE_KEY, { expiresIn: '86400s', algorithm: 'RS256' });
                res.status(201).json({
                    idToken: token,
                    expiresIn: 86400,
                    username: registeredAdmin.username
                });
            } catch(err) {
                console.log(err);
                res.status(401).send(err);
            }
        }
    } catch(err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
});

router.post("/login", async function(req, res){
    try {
        let foundAdmin = await Admin.findOne({username: req.body.username});
        if (!foundAdmin) {
            res.status(401).send("Invalid Username");
        } else {
            let formPassword = cryptoJS.SHA256(req.body.password).toString();
            if (formPassword!==foundAdmin.password) {
                res.status(401).send("Incorrect Password");
            } else {
                try {
                    let payload = { subject: foundAdmin._id };
                    let token = jwt.sign(payload, RSA_PRIVATE_KEY, { expiresIn: '86400s', algorithm: 'RS256' });
                    res.status(200).json({
                        idToken: token,
                        expiresIn: 86400,
                        username: foundAdmin.username
                    });
                } catch(err) {
                    res.status(401).send("Error in saving in the DB");
                }
            }
        }
    } catch(err) {
        return res.status(500).send("Server Error");
    }
});

router.get('/users', middleware.verifyToken, async function(req, res){
    try {
        let users = await User.find({});
        res.status(200).send(users);
    } catch(err) {
        res.status(500).send("Server Error");
    }
});

router.delete('/users/:id', async function(req, res) {
    try {
        let foundUser = await User.findById(req.params.id);
        if (!foundUser) {
            res.status(404).send("User not Found");
        } else {
            await user.delete();
            res.status(200).send("User Deleted");
        }
    } catch(err) {
        res.status(500).send("Server Error");
    }
});