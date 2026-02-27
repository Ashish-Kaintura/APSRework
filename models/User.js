const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ["user", "admin", "superadmin"],
            default: "user",
        },
        // Extra fields for normal users
        phone: {
            type: String,
        },
        requirements: {
            type: String,

        },
        companyname: {
            type: String,

        },


        address: {
            street: String,
            city: String,
            state: String,
            postalCode: String,
            country: String,
        },

        profileImage: {
            type: String,
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
