const Conversation = require("../models/conversationModel");
const Message = require("../models/messageModel");

const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }
    const newMessage = await Message.create({
      senderId,
      receiverId,
      message,
    });

    if (!conversation.message) {
      //console.log("conversation.message is not defined empty array");
      conversation.message = [];
    }

    if (newMessage) {
      console.log(newMessage._id);
      conversation.messages.push(newMessage._id);
    }

    //add socketio functionality here

    await Promise.all([conversation.save(), newMessage.save()]);

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("error in sendMessage", error.message);
    res.status(500).json({ eror: "Internal server error" });
  }
};

const getMessages = async (req, res) => {
  try {
    const { id: matchId } = req.params;
    const senderId = req.user._id;

    console.log(matchId, senderId);
    const conversation = await Conversation.findOne({
      participants: { $all: [matchId, senderId] },
    }).populate("messages"); // returns array of objects with all messages

    if (!conversation) {
      return res.status(200).json([]);
    }
    const messages = conversation.messages;

    res.status(200).json(messages);
  } catch (error) {
    console.log("error in getMessages", error.message);
    res.status(500).json({ eror: "Internal server error" });
  }
};

module.exports = {
  sendMessage,
  getMessages,
};
