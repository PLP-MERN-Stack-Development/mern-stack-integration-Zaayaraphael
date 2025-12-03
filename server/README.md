# MERN Blog - Backend Server

Express.js backend server for the MERN Blog application.

![screenshot](/Screenshot%20(119).png)
![screenshot](/Screenshot%20(120).png)

## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   - Copy `.env.example` to `.env`
   - Update the values with your configuration:
     - `MONGODB_URI`: Your MongoDB connection string
     - `JWT_SECRET`: A secure random string for JWT signing
     - `PORT`: Server port (default: 5000)

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Start the production server:**
   ```bash
   npm start
   ```

## Project Structure

```
server/
├── config/         # Configuration files (database, etc.)
├── controllers/    # Route controllers (business logic)
├── middleware/     # Custom middleware (auth, validation, error handling)
├── models/         # Mongoose models
├── routes/         # API route definitions
├── utils/          # Utility functions
├── uploads/        # User-uploaded files
├── server.js       # Main server file
└── package.json    # Dependencies and scripts
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Posts
- `GET /api/posts` - Get all posts (with pagination)
- `GET /api/posts/:id` - Get single post
- `POST /api/posts` - Create new post (protected)
- `PUT /api/posts/:id` - Update post (protected)
- `DELETE /api/posts/:id` - Delete post (protected)
- `POST /api/posts/:id/comments` - Add comment (protected)
- `GET /api/posts/search` - Search posts

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category (protected)

## Environment Variables

See `.env.example` for required environment variables.

## Dependencies

- **express** - Web framework
- **mongoose** - MongoDB ODM
- **dotenv** - Environment variable management
- **cors** - Cross-origin resource sharing
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **express-validator** - Input validation
- **multer** - File upload handling

## Development Dependencies

- **nodemon** - Auto-restart server on changes
- **jest** - Testing framework
- **supertest** - HTTP testing
- **fast-check** - Property-based testing
