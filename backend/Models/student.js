const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
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
        required: true,
        unique: true    
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "departments",
        required: true
    },
    semester: {
        type: String,
        required: true,
        enum: ["1", "2", "3", "4", "5", "6", "7", "8"],
        unique: true
    },
    rollNo: {
        type: String,
        required: true,
        unique: true
    },
    passwordUpdated: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("student", studentSchema)