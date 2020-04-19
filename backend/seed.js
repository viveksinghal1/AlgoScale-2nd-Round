const mongoose = require("mongoose");
const User = require("./models/user");

const data = [
    {
        username: "vivek",
        firstName: "Vivek",
        lastName: "Singhal",
        email: "viveksinghal0003@gmail.com"
    },
    {
        username: "vineet",
        firstName: "Vineet",
        lastName: "Rathor",
        email: "vineetrathor@gmail.com"
    },
    {
        username: "deepanshu",
        firstName: "Deepanshu",
        lastName: "Sharma",
        email: "deepanshusharma@gmail.com"
    },
    {
        username: "divyansh",
        firstName: "Divyansh",
        lastName: "Arya",
        email: "divyansharya@gmail.com"
    },
    {
        username: "ashutosh",
        firstName: "Ashutosh",
        lastName: "Anand",
        email: "ashutosh.anand@gmail.com"
    },
    {
        username: "shivam",
        firstName: "Shivam",
        lastName: "Mehrotra",
        email: "shivam.mehrotra@gmail.com"
    },
    {
        username: "sanket",
        firstName: "Sanket",
        lastName: "Goyal",
        email: "sanket.goyal@gmail.com"
    },
    {
        username: "suarabh",
        firstName: "Saurabh",
        lastName: "Singh",
        email: "saurabh.singh@gmail.com"
    },
    {
        username: "prakhar",
        firstName: "Prakhar",
        lastName: "Bansal",
        email: "prakhar.bansal@gmail.com"
    }
];

async function seedDB() {
    try {
        await User.deleteMany({});
        data.forEach( async function(user){
            await User.create(user);
        });
    } catch(err) {
        console.log(err);
    }
}

module.exports = seedDB;