const Post = require('../models/Post');
const Reply = require('../models/Reply');
const { uploadImage } = require('../utils/imageUpload');
const { sendNotification } = require('../utils/socket');

// Create a new post
exports.createPost = async (req, res) => {
  try {
    const { text } = req.body;
    let imageUrl = '';

    if (req.file) {
      imageUrl = await uploadImage(req.file);
    }

    const post = new Post({
      text,
      imageUrl,
      author: req.user ? req.user._id : null,
    });

    await post.save();

    // Emit real-time event for new post
    sendNotification('newPost', post);

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create post' });
  }
};

// Get all posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }).populate('replies');
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
};

// Get a single post by ID
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('replies');
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch post' });
  }
};

// Update a post by ID
exports.updatePost = async (req, res) => {
  try {
    const { text } = req.body;
    let imageUrl = '';

    if (req.file) {
      imageUrl = await uploadImage(req.file);
    }

    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    post.text = text;
    if (imageUrl) {
      post.imageUrl = imageUrl;
    }

    await post.save();

    // Emit real-time event for updated post
    sendNotification('updatePost', post);

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update post' });
  }
};

// Delete a post by ID
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    await Post.findByIdAndDelete(req.params.id);

    // Emit real-time event for deleted post
    sendNotification('deletePost', req.params.id);

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete post' });
  }
};

// Add a reply to a post
exports.addReply = async (req, res) => {
  try {
    const { text } = req.body;
    let imageUrl = '';

    if (req.file) {
      imageUrl = await uploadImage(req.file);
    }

    const reply = new Reply({
      text,
      imageUrl,
      author: req.user ? req.user._id : null,
    });

    await reply.save();

    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { $push: { replies: reply._id } },
      { new: true }
    ).populate('replies');

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Emit real-time event for new reply
    sendNotification('newReply', { postId: req.params.id, reply });

    res.status(201).json(reply);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add reply' });
  }
};