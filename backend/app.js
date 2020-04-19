const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

const app = express();

const authRoutes = require("./routes/auth");
dotenv.config();

const url = process.env.DATABASEURL || "mongodb://localhost:27017/algoscale_admin_panel";

mongoose.connect(url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(()=>console.log("mongoDB connected at port 27017"))
.catch(err=>console.log("MongoDB Error: " + err.message));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", authRoutes);

app.get("*", (req, res)=>{
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.listen(process.env.PORT || 3000, process.env.IP, ()=>{
    console.log("Server started at port: 3000");
});