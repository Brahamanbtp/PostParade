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
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Define the Post schema
const PostSchema = new Schema({
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
  },
  replies: [ReplySchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware to populate the 'author' field in replies
PostSchema.pre('find', function(next) {
  this.populate('replies.author');
  next();
});

// Create the Post model
const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
