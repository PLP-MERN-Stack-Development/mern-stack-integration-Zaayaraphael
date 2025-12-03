import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { postService } from '../services/api';
import { useAuth } from '../hooks/useAuth';
import LoadingSpinner from '../components/LoadingSpinner';
import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';
import './PostDetailPage.css';

const PostDetailPage = () => {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [commentLoading, setCommentLoading] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const data = await postService.getPost(id);
        setPost(data.post);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to load post');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleCommentSubmit = async (commentData) => {
    try {
      setCommentLoading(true);
      const data = await postService.addComment(post._id, commentData);
      setPost(data.post);
      return { success: true };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.error || 'Failed to post comment',
      };
    } finally {
      setCommentLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="container">
        <div className="error-container">
          <h2>Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container">
        <div className="error-container">
          <h2>Post not found</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="post-detail-page">
      <div className="container">
        <article className="post-detail">
          <header className="post-header">
            <h1>{post.title}</h1>
            <div className="post-meta">
              <span className="post-author">
                By {post.author?.username || 'Anonymous'}
              </span>
              <span className="post-date">{formatDate(post.createdAt)}</span>
              {post.category && (
                <span className="post-category">{post.category.name}</span>
              )}
            </div>
          </header>

          {post.featuredImage && post.featuredImage !== 'default-post.jpg' && (
            <div className="post-featured-image">
              <img
                src={
                  post.featuredImage.startsWith('/')
                    ? `http://localhost:5000${post.featuredImage}`
                    : `http://localhost:5000/uploads/${post.featuredImage}`
                }
                alt={post.title}
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          )}

          <div className="post-content">
            {post.content.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <div className="post-footer">
            <span>{post.viewCount || 0} views</span>
            {post.tags && post.tags.length > 0 && (
              <div className="post-tags">
                {post.tags.map((tag, index) => (
                  <span key={index} className="tag">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </article>

        <div className="comments-section">
          <CommentList comments={post.comments} />
          {isAuthenticated() ? (
            <CommentForm
              onSubmit={handleCommentSubmit}
              loading={commentLoading}
            />
          ) : (
            <div className="login-prompt">
              <p>Please log in to leave a comment</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostDetailPage;
