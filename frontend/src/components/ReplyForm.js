import React, { useState } from 'react';
import axios from 'axios';

const ReplyForm = ({ postId, onSubmit }) => {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('text', text);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await axios.post(`/api/posts/${postId}/replies`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      onSubmit(response.data);
    } catch (error) {
      setError('Error creating reply');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="text">Reply Text:</label>
        <textarea
          id="text"
          value={text}
          onChange={handleTextChange}
          required
        />
      </div>
      <div>
        <label htmlFor="image">Upload Image (optional):</label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>
      {error && <div className="error">{error}</div>}
      <button type="submit" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit Reply'}
      </button>
    </form>
  );
};

export default ReplyForm;
