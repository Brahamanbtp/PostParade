import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch posts from the API
    const fetchPosts = async () => {
      try {
        const response = await axios.get('/api/posts'); // Adjust the API endpoint as needed
        setPosts(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching posts');
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <div>Loading posts...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div id="post-list">
      <h2>Latest Posts</h2>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post._id} className="post">
            <h3>{post.text}</h3>
            {post.imageUrl && <img src={post.imageUrl} alt="Post" />}
            <p>Author: {post.author ? post.author.username : 'Unknown'}</p>
            <p>Created At: {new Date(post.createdAt).toLocaleString()}</p>
            <div className="replies">
              <h4>Replies:</h4>
              {post.replies.length > 0 ? (
                post.replies.map((reply) => (
                  <div key={reply._id} className="reply">
                    <p>{reply.text}</p>
                    {reply.imageUrl && <img src={reply.imageUrl} alt="Reply" />}
                    <p>Author: {reply.author ? reply.author.username : 'Unknown'}</p>
                    <p>Created At: {new Date(reply.createdAt).toLocaleString()}</p>
                  </div>
                ))
              ) : (
                <p>No replies yet.</p>
              )}
            </div>
          </div>
        ))
      ) : (
        <p>No posts available.</p>
      )}
    </div>
  );
};

export default PostList;
