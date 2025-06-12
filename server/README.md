
## `backend/README.md`

# Backend - Server Side (Node.js + Express)

This is the backend server for the full-stack application. It provides REST APIs, handles user authentication, image uploads, and interacts with MongoDB.


## Quick Start

### 1. Navigate to the Backend Directory
cd backend

### 2. Install Dependencies
npm install

### 3. Run in Development Mode
npm run dev

### 4. Run Normally
npm start

# Setup .env File
PORT=4000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret
CLIENT_URL=http://localhost:5173
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret


# Technologies Used
Node.js
Express.js
MongoDB (via Mongoose)
JWT for authentication
Cloudinary for image uploads
Multer, express-fileupload
Helmet, XSS Clean, Rate Limiting for security
dotenv for env management

# Folder Structure
backend/
├── controllers/
├── models/
├── routes/
├── middlewares/
├── utils/
├── server.js
└── config/

# Scripts
npm run dev – Start with nodemon (auto-restart on changes)
npm start – Start normally with Node.js