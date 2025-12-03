# MERN Blog - Frontend Client

React frontend for the MERN Blog application built with Vite.

## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   - Copy `.env.example` to `.env`
   - Update `VITE_API_URL` if your backend runs on a different port

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## Project Structure

```
client/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Page components
│   ├── hooks/          # Custom React hooks
│   ├── context/        # React context providers
│   ├── services/       # API service layer
│   ├── utils/          # Utility functions
│   ├── App.jsx         # Main app component
│   ├── main.jsx        # Entry point
│   └── index.css       # Global styles
├── public/             # Static assets
├── index.html          # HTML template
└── vite.config.js      # Vite configuration
```

## Features

- User authentication (register/login)
- Browse blog posts with pagination
- View individual post details
- Create new blog posts (authenticated users)
- Comment on posts (authenticated users)
- Responsive design
- Protected routes

## Available Pages

- `/` - Home page with post list
- `/posts/:id` - Individual post detail page
- `/login` - User login
- `/register` - User registration
- `/create` - Create new post (protected)

## Technologies

- React 18
- React Router v6
- Axios for API calls
- Vite for build tooling
- Context API for state management

## Development

The app runs on `http://localhost:3000` by default and proxies API requests to `http://localhost:5000`.
