const mongoose = require("mongoose");
const department = require("./department");

const facultySchema = new mongoose.Schema({
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
    gender: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    department: {
        type: String,
        required: true
    },
    joiningYear: {
        type: String,
        required: true
    },
    passwordUpdated: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("faculty", facultySchema)