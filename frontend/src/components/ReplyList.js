import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ReplyList = ({ postId }) => {
  const [replies, setReplies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch replies for the given post ID
    const fetchReplies = async () => {
      try {
        const response = await axios.get(`/api/posts/${postId}/replies`); // Adjust the API endpoint as needed
        setReplies(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching replies');
        setLoading(false);
      }
    };

    fetchReplies();
  }, [postId]);

  if (loading) {
    return <div>Loading replies...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="replies">
      <h3>Replies</h3>
      {replies.length > 0 ? (
        replies.map((reply) => (
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
  );
};

export default ReplyList;
