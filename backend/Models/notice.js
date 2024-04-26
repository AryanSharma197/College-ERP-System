const mongoose = require("mongoose");

const noticeSchema = new mongoose.Schema({
    topic: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("notice", noticeSchema)