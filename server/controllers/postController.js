// postController.js - Post controller

const Post = require('../models/Post');

// @desc    Get all posts with pagination and filtering
// @route   GET /api/posts
// @access  Public
const getAllPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Build query
    const query = { isPublished: true };

    // Filter by category if provided
    if (req.query.category) {
      query.category = req.query.category;
    }

    // Get total count for pagination
    const total = await Post.countDocuments(query);

    // Get posts with pagination
    const posts = await Post.find(query)
      .populate('author', 'username email')
      .populate('category', 'name slug')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      count: posts.length,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server error while fetching posts',
    });
  }
};

// @desc    Get single post by ID or slug
// @route   GET /api/posts/:id
// @access  Public
const getPost = async (req, res) => {
  try {
    const { id } = req.params;

    // Try to find by ID first, then by slug
    let post = await Post.findById(id)
      .populate('author', 'username email')
      .populate('category', 'name slug')
      .populate('comments.user', 'username');

    if (!post) {
      post = await Post.findOne({ slug: id })
        .populate('author', 'username email')
        .populate('category', 'name slug')
        .populate('comments.user', 'username');
    }

    if (!post) {
      return res.status(404).json({
        success: false,
        error: 'Post not found',
      });
    }

    // Increment view count
    await post.incrementViewCount();

    res.status(200).json({
      success: true,
      post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server error while fetching post',
    });
  }
};

// @desc    Create new post
// @route   POST /api/posts
// @access  Private
const createPost = async (req, res) => {
  try {
    const { title, content, excerpt, category, tags, featuredImage, isPublished } = req.body;

    // Create post with authenticated user as author
    const post = await Post.create({
      title,
      content,
      excerpt,
      category,
      tags,
      featuredImage: featuredImage || 'default-post.jpg',
      isPublished: isPublished || false,
      author: req.user._id,
    });

    // Populate author and category
    await post.populate('author', 'username email');
    await post.populate('category', 'name slug');

    res.status(201).json({
      success: true,
      post,
    });
  } catch (error) {
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        error: errors.join(', '),
      });
    }

    // Handle duplicate slug error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: 'A post with this title already exists',
      });
    }

    res.status(500).json({
      success: false,
      error: 'Server error while creating post',
    });
  }
};

// @desc    Update post
// @route   PUT /api/posts/:id
// @access  Private (owner only)
const updatePost = async (req, res) => {
  try {
    const { title, content, excerpt, category, tags, featuredImage, isPublished } = req.body;

    // Find post
    let post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        error: 'Post not found',
      });
    }

    // Update fields
    if (title) post.title = title;
    if (content) post.content = content;
    if (excerpt !== undefined) post.excerpt = excerpt;
    if (category) post.category = category;
    if (tags) post.tags = tags;
    if (featuredImage) post.featuredImage = featuredImage;
    if (isPublished !== undefined) post.isPublished = isPublished;

    await post.save();

    // Populate references
    await post.populate('author', 'username email');
    await post.populate('category', 'name slug');

    res.status(200).json({
      success: true,
      post,
    });
  } catch (error) {
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        error: errors.join(', '),
      });
    }

    res.status(500).json({
      success: false,
      error: 'Server error while updating post',
    });
  }
};

// @desc    Delete post
// @route   DELETE /api/posts/:id
// @access  Private (owner only)
const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        error: 'Post not found',
      });
    }

    await post.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Post deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server error while deleting post',
    });
  }
};

// @desc    Search posts
// @route   GET /api/posts/search
// @access  Public
const searchPosts = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        error: 'Search query is required',
      });
    }

    // Search in title and content using regex
    const posts = await Post.find({
      isPublished: true,
      $or: [
        { title: { $regex: q, $options: 'i' } },
        { content: { $regex: q, $options: 'i' } },
      ],
    })
      .populate('author', 'username email')
      .populate('category', 'name slug')
      .sort({ createdAt: -1 })
      .limit(20);

    res.status(200).json({
      success: true,
      count: posts.length,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server error while searching posts',
    });
  }
};

// @desc    Add comment to post
// @route   POST /api/posts/:id/comments
// @access  Private
const addComment = async (req, res) => {
  try {
    const { content } = req.body;
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        error: 'Post not found',
      });
    }

    // Add comment using the model method
    await post.addComment(req.user._id, content);

    // Populate the newly added comment
    await post.populate('comments.user', 'username');

    res.status(201).json({
      success: true,
      post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server error while adding comment',
    });
  }
};

module.exports = {
  getAllPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  searchPosts,
  addComment,
};
