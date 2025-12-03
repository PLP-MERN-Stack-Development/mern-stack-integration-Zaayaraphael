# MERN Blog Application

A full-stack blog application built with MongoDB, Express.js, React.js, and Node.js demonstrating seamless integration between frontend and backend components.

## 🚀 Features Implemented

### Backend (Express.js + MongoDB)
- ✅ RESTful API with full CRUD operations
- ✅ User authentication with JWT tokens
- ✅ Password hashing with bcrypt
- ✅ Input validation with express-validator
- ✅ Image upload with multer
- ✅ Pagination for post listings
- ✅ Search functionality
- ✅ Category filtering
- ✅ Comments system
- ✅ Comprehensive error handling

### Frontend (React + Vite)
- ✅ User authentication (register/login)
- ✅ Browse blog posts with pagination
- ✅ View individual post details
- ✅ Create new blog posts (authenticated users)
- ✅ Comment on posts (authenticated users)
- ✅ Protected routes
- ✅ Responsive design
- ✅ Context API for state management
- ✅ Custom hooks for API calls

## 📂 Project Structure

```
mern-blog/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── context/        # Auth context provider
│   │   ├── services/       # API service layer
│   │   └── App.jsx         # Main app component
│   ├── package.json
│   └── vite.config.js
├── server/                 # Express.js backend
│   ├── config/             # Database configuration
│   ├── controllers/        # Route controllers
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── middleware/         # Auth, validation, error handling
│   ├── uploads/            # User-uploaded images
│   ├── server.js           # Main server file
│   └── package.json
└── README.md
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

### Backend Setup

1. **Navigate to server directory:**
   ```bash
   cd server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   - Copy `.env.example` to `.env`
   - Update the following variables:
     ```
     PORT=5000
     NODE_ENV=development
     MONGODB_URI=your_mongodb_connection_string_here
     JWT_SECRET=your_jwt_secret_key_here
     JWT_EXPIRE=7d
     ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

   The backend will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to client directory:**
   ```bash
   cd client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   - Copy `.env.example` to `.env`
   - Update if needed:
     ```
     VITE_API_URL=http://localhost:5000/api
     ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

   The frontend will run on `http://localhost:3000`

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Posts
- `GET /api/posts` - Get all posts (with pagination & filtering)
- `GET /api/posts/search?q=query` - Search posts
- `GET /api/posts/:id` - Get single post
- `POST /api/posts` - Create new post (protected)
- `PUT /api/posts/:id` - Update post (protected, owner only)
- `DELETE /api/posts/:id` - Delete post (protected, owner only)
- `POST /api/posts/:id/comments` - Add comment (protected)
- `POST /api/posts/upload` - Upload image (protected)

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category (protected)

## 🎨 Frontend Pages

- `/` - Home page with post list
- `/posts/:id` - Individual post detail page
- `/login` - User login
- `/register` - User registration
- `/create` - Create new post (protected)

## 🔒 Security Features

- Password hashing with bcrypt (10 salt rounds)
- JWT-based authentication
- Protected API routes
- Input validation and sanitization
- File upload restrictions (type and size)
- CORS configuration



## 📝 Usage

1. **Register a new account** at `/register`
2. **Login** with your credentials at `/login`
3. **Browse posts** on the home page
4. **Create a post** by clicking "Create Post" in the navbar
5. **View post details** by clicking on any post card
6. **Add comments** on post detail pages (when logged in)

## 🚀 Deployment Considerations

### Backend
- Set `NODE_ENV=production`
- Use strong JWT secret
- Configure CORS for production domain
- Set up MongoDB Atlas for cloud database
- Consider using environment-specific configs

### Frontend
- Run `npm run build` to create production bundle
- Deploy to Vercel, Netlify, or similar
- Update API URL to production backend

## 📚 Technologies Used

### Backend
- Express.js - Web framework
- MongoDB - Database
- Mongoose - ODM
- JWT - Authentication
- Bcrypt - Password hashing
- Multer - File uploads
- Express-validator - Input validation

### Frontend
- React 18 - UI library
- React Router v6 - Routing
- Axios - HTTP client
- Vite - Build tool
- Context API - State management

