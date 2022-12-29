import mongoose from "mongoose"

const ConversationSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: "Name is required!",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Conversation", ConversationSchema);