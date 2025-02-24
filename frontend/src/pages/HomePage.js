import React from 'react';
import PostList from './PostList'; // Import the PostList component

const HomePage = () => {
  return (
    <div className="homepage">
      <header className="homepage-header">
        <h1>Welcome to Imageboard App</h1>
        <p>Share your thoughts and images with the community.</p>
      </header>

      <section className="homepage-features">
        <h2>Features</h2>
        <ul>
          <li>Create and share posts with images.</li>
          <li>Engage in discussions with replies.</li>
          <li>Real-time updates and notifications.</li>
        </ul>
      </section>

      <section className="homepage-posts">
        <h2>Latest Posts</h2>
        <PostList /> {/* Render the list of latest posts */}
      </section>

      <footer className="homepage-footer">
        <p>&copy; {new Date().getFullYear()} Imageboard App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
