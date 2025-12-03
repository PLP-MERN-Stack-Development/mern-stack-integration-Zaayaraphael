import React from 'react';
import './CommentList.css';

const CommentList = ({ comments }) => {
  if (!comments || comments.length === 0) {
    return (
      <div className="no-comments">
        <p>No comments yet. Be the first to comment!</p>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="comment-list">
      <h3>Comments ({comments.length})</h3>
      {comments.map((comment) => (
        <div key={comment._id} className="comment-item">
          <div className="comment-header">
            <span className="comment-author">
              {comment.user?.username || 'Anonymous'}
            </span>
            <span className="comment-date">{formatDate(comment.createdAt)}</span>
          </div>
          <p className="comment-content">{comment.content}</p>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
