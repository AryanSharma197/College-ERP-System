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
    noticeFor: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("notice", noticeSchema)