import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReplyList from './ReplyList'; // Import the ReplyList component
import ReplyForm from './ReplyForm'; // Import the ReplyForm component

const ThreadPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the post data using the postId
    const fetchPost = async () => {
      try {
        const response = await axios.get(`/api/posts/${postId}`); // Adjust the API endpoint as needed
        setPost(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching post');
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  const handleReplySubmit = (newReply) => {
    // Handle the submission of a new reply
    setPost((prevPost) => ({
      ...prevPost,
      replies: [...prevPost.replies, newReply],
    }));
  };

  if (loading) {
    return <div>Loading post...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="thread-page">
      <div className="post-details">
        <h2>{post.text}</h2>
        {post.imageUrl && <img src={post.imageUrl} alt="Post" />}
        <p>Author: {post.author ? post.author.username : 'Unknown'}</p>
        <p>Created At: {new Date(post.createdAt).toLocaleString()}</p>
      </div>

      <ReplyList postId={postId} /> {/* Render the list of replies */}

      <ReplyForm postId={postId} onSubmit={handleReplySubmit} /> {/* Render the reply form */}
    </div>
  );
};

export default ThreadPage;
