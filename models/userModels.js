const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        firstName : {
            type: String,
            required: [true, "Please enter your First Name"]
        },
        lastName : {
            type: String,
            required: [true, "Please enter your Last Name"]
        },
        personName : {
            type: String,
            required: [true, "Please enter your Full Name"]
        },
        email : {
            type: String,
            required: [true, "Please enter a valid email"]
        }
    },
    {
        timestamps: true
    }
)


const User = mongoose.model("User", userSchema);

module.exports = User;