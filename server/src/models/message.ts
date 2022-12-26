import mongoose from "mongoose"
const msgSchema = new mongoose.Schema({
        conversationId: {
            type: String,
        },
        sender: {
            type: String,
        },
        text: {
            type: String,
        },
    },
    { timestamps: true }
)

const Msg = mongoose.model('msg',msgSchema)
module.exports = Msg;