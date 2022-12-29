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

const Message = mongoose.model('Message',msgSchema)
module.exports = Message;