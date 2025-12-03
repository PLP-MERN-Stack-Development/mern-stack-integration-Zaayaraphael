import React from 'react';
import PostCard from './PostCard';
import LoadingSpinner from './LoadingSpinner';
import './PostList.css';

const PostList = ({ posts, loading }) => {
  if (loading) {
    return <LoadingSpinner />;
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="empty-state">
        <h3>No posts found</h3>
        <p>Check back later for new content!</p>
      </div>
    );
  }

  return (
    <div className="post-list">
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
