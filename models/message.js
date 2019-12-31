const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema(
  {
    body: {
      type: String,
      required: true
    },
    owner: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = Message = mongoose.model("Message", MessageSchema);
