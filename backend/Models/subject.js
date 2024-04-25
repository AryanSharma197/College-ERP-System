const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
    subjectName: {
        type: String,
        required: true
    },
    subjectCode: {
        type: String,
        required: true,
        unique: true
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "departments",
        required: true,
        unique: true
    },
    semester: {
        type: String,
        required: true,
        enum: ["1", "2", "3", "4", "5", "6", "7", "8"],
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "faculties",
        required: true,
        unique: true
    },
    totalLectures: {
        type: Number,
        required: true,
        default: 15
    },
    type: {
        type: String,
        required: true,
        enum: ["theory", "practical"]
    },
    credits: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model("subject", subjectSchema)