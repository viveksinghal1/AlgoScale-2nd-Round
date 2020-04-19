const jwt = require("jsonwebtoken");
const fs = require("fs");
const RSA_PUBLIC_KEY = fs.readFileSync("./keys/public.key");

const Admin = require("../models/admin");

let middleware = {};

middleware.verifyToken = async function(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send("Non-Authenticated");
    }
    let token = req.headers.authorization.split(' ')[1];
    let username = req.headers.authorization.split(' ')[2];
    if (token==='null' || username===null) {
        return res.status(401).send("Non-Authenticated");
    }

    try {
        let payload = await jwt.verify(token, RSA_PUBLIC_KEY, {algorithms: 'RS256'});
        // console.log(payload.subject);
        req.userId = payload.subject;
        let user = await Admin.findById(payload.subject);
        if (user)
            next();
        else
            res.status(401).send("Non-Authenticated");
        
    } catch(err) {
        return res.status(401).send("Non-Authenticated");
    }
}

module.exports = middleware;