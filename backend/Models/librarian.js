const mongoose = require("mongoose")

const librarianSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    joiningYear: {
        type: Number,
        required: true
    },
    passwordUpdated: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("librarian", librarianSchema)