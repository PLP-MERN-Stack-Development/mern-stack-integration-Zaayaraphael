# MERN Blog - Quick Setup Guide

Follow these steps to get the application running on your local machine.

## Step 1: Install Dependencies

### Backend
```bash
cd server
npm install
```

### Frontend
```bash
cd client
npm install
```

## Step 2: Configure MongoDB

You have two options:

### Option A: MongoDB Atlas (Cloud - Recommended)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster
4. Click "Connect" and choose "Connect your application"
5. Copy the connection string
6. Replace `<password>` with your database user password
7. Replace `<dbname>` with your database name (e.g., `mern-blog`)

Example connection string:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/mern-blog?retryWrites=true&w=majority
```

### Option B: Local MongoDB
1. Install MongoDB locally from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017/mern-blog`

## Step 3: Configure Environment Variables

### Backend (.env file)
Create `server/.env` file:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=your_mongodb_connection_string_here
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
```

**Important:** Replace `your_mongodb_connection_string_here` with your actual MongoDB connection string!

### Frontend (.env file)
Create `client/.env` file:
```env
VITE_API_URL=http://localhost:5000/api
```

## Step 4: Start the Application

### Start Backend (Terminal 1)
```bash
cd server
npm run dev
```

You should see:
```
Server running on port 5000
Connected to MongoDB
```

### Start Frontend (Terminal 2)
```bash
cd client
npm run dev
```

You should see:
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:3000/
```

## Step 5: Create a Category (Required for Creating Posts)

Before you can create posts, you need at least one category. You can do this via API:

### Using curl:
```bash
# First, register and login to get a token
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","email":"admin@example.com","password":"password123"}'

# Copy the token from the response, then create a category
curl -X POST http://localhost:5000/api/categories \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"name":"Technology","description":"Tech related posts"}'
```

### Or use a tool like Postman:
1. POST to `http://localhost:5000/api/auth/register` with:
   ```json
   {
     "username": "admin",
     "email": "admin@example.com",
     "password": "password123"
   }
   ```
2. Copy the token from response
3. POST to `http://localhost:5000/api/categories` with:
   - Header: `Authorization: Bearer YOUR_TOKEN`
   - Body:
     ```json
     {
       "name": "Technology",
       "description": "Tech related posts"
     }
     ```

## Step 6: Test the Application

1. Open browser to `http://localhost:3000`
2. Click "Register" and create an account
3. Login with your credentials
4. Click "Create Post" to write your first blog post
5. Select the category you created
6. Publish your post!

## Troubleshooting

### Backend won't start
- Check if MongoDB is running
- Verify your MONGODB_URI in `.env` file
- Make sure port 5000 is not in use

### Frontend won't start
- Make sure you ran `npm install` in client directory
- Check if port 3000 is available
- Verify VITE_API_URL in `.env` file

### Can't create posts
- Make sure you're logged in
- Verify at least one category exists
- Check browser console for errors

### MongoDB connection fails
- Verify connection string is correct
- Check if your IP is whitelisted in MongoDB Atlas
- Ensure database user has correct permissions

## Default Test Account

After setup, you can create a test account:
- Username: `testuser`
- Email: `test@example.com`
- Password: `password123`

## Next Steps

- Explore the API endpoints in the README.md
- Check out the code structure
- Try creating posts, commenting, and searching
- Customize the styling to your liking

## Need Help?

- Check the main README.md for detailed documentation
- Review the API endpoints section
- Look at the code comments for implementation details

Happy coding! 🚀
