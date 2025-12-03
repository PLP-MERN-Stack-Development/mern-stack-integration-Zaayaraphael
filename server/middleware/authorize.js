// authorize.js - Authorization middleware for resource ownership

const Post = require('../models/Post');

// Check if user owns the post
const authorizePostOwner = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        error: 'Post not found',
      });
    }

    // Check if user is the post author or admin
    if (post.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to perform this action',
      });
    }

    // Attach post to request for use in controller
    req.post = post;
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
};

// Generic authorization check for resource ownership
const authorize = (model) => {
  return async (req, res, next) => {
    try {
      const resource = await model.findById(req.params.id);

      if (!resource) {
        return res.status(404).json({
          success: false,
          error: 'Resource not found',
        });
      }

      // Check ownership (assumes resource has 'author' or 'user' field)
      const ownerId = resource.author || resource.user;
      
      if (ownerId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        return res.status(403).json({
          success: false,
          error: 'Not authorized to perform this action',
        });
      }

      next();
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: 'Server error',
      });
    }
  };
};

module.exports = { authorizePostOwner, authorize };
