import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch users and posts data
    const fetchData = async () => {
      try {
        const [usersResponse, postsResponse] = await Promise.all([
          axios.get('/api/admin/users'), // Adjust the API endpoint as needed
          axios.get('/api/admin/posts'),  // Adjust the API endpoint as needed
        ]);

        setUsers(usersResponse.data);
        setPosts(postsResponse.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`/api/admin/users/${userId}`); // Adjust the API endpoint as needed
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      setError('Error deleting user');
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      await axios.delete(`/api/admin/posts/${postId}`); // Adjust the API endpoint as needed
      setPosts(posts.filter((post) => post._id !== postId));
    } catch (error) {
      setError('Error deleting post');
    }
  };

  if (loading) {
    return <div>Loading data...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="admin-panel">
      <h1>Admin Panel</h1>

      <section className="admin-users">
        <h2>Users</h2>
        <ul>
          {users.map((user) => (
            <li key={user._id}>
              {user.username} ({user.email})
              <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </section>

      <section className="admin-posts">
        <h2>Posts</h2>
        <ul>
          {posts.map((post) => (
            <li key={post._id}>
              {post.text}
              <button onClick={() => handleDeletePost(post._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default AdminPanel;
