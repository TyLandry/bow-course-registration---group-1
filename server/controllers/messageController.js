import Message from "../models/message.js";

// Gets all messages
export async function getMessages(req, res) {
  try {
    const messages = await Message.find({});
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error getting messages:", error);
    res.status(500).json({ message: "Could not get messages" });
  }
}
