const Post = require('../models/Post'); // Import the Post model

// Create a new post
const createPost = async (text, imageUrl, authorId) => {
  try {
    const post = new Post({
      text,
      imageUrl,
      author: authorId,
    });

    await post.save();
    return post;
  } catch (error) {
    throw new Error('Error creating post');
  }
};

// Get all posts
const getAllPosts = async () => {
  try {
    const posts = await Post.find().populate('author', 'username').sort({ createdAt: -1 });
    return posts;
  } catch (error) {
    throw new Error('Error fetching posts');
  }
};

// Get a single post by ID
const getPostById = async (postId) => {
  try {
    const post = await Post.findById(postId).populate('author', 'username').populate({
      path: 'replies',
      populate: {
        path: 'author',
        select: 'username',
      },
    });

    if (!post) {
      throw new Error('Post not found');
    }

    return post;
  } catch (error) {
    throw new Error('Error fetching post');
  }
};

// Update a post by ID
const updatePost = async (postId, text, imageUrl) => {
  try {
    const post = await Post.findByIdAndUpdate(
      postId,
      { text, imageUrl },
      { new: true, runValidators: true }
    );

    if (!post) {
      throw new Error('Post not found');
    }

    return post;
  } catch (error) {
    throw new Error('Error updating post');
  }
};

// Delete a post by ID
const deletePost = async (postId) => {
  try {
    const post = await Post.findByIdAndDelete(postId);

    if (!post) {
      throw new Error('Post not found');
    }

    return post;
  } catch (error) {
    throw new Error('Error deleting post');
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
};
