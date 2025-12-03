import React from 'react';
import { Link } from 'react-router-dom';
import './PostCard.css';

const PostCard = ({ post }) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="post-card">
      <Link to={`/posts/${post.slug || post._id}`}>
        <div className="post-card-image">
          <img
            src={
              post.featuredImage?.startsWith('/')
                ? `http://localhost:5000${post.featuredImage}`
                : `http://localhost:5000/uploads/${post.featuredImage}`
            }
            alt={post.title}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/400x250?text=No+Image';
            }}
          />
        </div>
      </Link>

      <div className="post-card-content">
        <div className="post-card-meta">
          <span className="post-author">
            {post.author?.username || 'Anonymous'}
          </span>
          <span className="post-date">{formatDate(post.createdAt)}</span>
        </div>

        <Link to={`/posts/${post.slug || post._id}`}>
          <h3 className="post-card-title">{post.title}</h3>
        </Link>

        <p className="post-card-excerpt">
          {post.excerpt || post.content?.substring(0, 150) + '...'}
        </p>

        <div className="post-card-footer">
          {post.category && (
            <span className="post-category">{post.category.name}</span>
          )}
          <span className="post-views">{post.viewCount || 0} views</span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
