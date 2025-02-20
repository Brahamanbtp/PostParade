const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Reply schema
const ReplySchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the Reply model
const Reply = mongoose.model('Reply', ReplySchema);

module.exports = Reply;
