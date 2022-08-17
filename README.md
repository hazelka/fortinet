# Fortinet Test Case

## Task 1 - File Management App

#### Functionalities:
- User Registration
- User Login
- File Upload (Supports multiple files)
- File Download

#### Stack:
- Frontend: React
- Backend: Node.js + Express
- Database: SQLite
- Security: JWT, Bcrypt

#### APIs: 
All secured by JWT token
- GET   /api/files
- GET   /api/download/:fileId
- POST  /api/upload
- POST  /api/auth/signup
- POST  /api/auth/signin

## Initial Setup - Run Locally
In one terminal, start the frontend (default: http://localhost:3000)
```
cd client
npm install
npm start
```
In another terminal, start the backend server (default: http://localhost:8080)
```
cd server
npm install
npm start
```

# Task 2 & Task 3
Both functions are written in JavaScript, can be runned via
```
node task2.js
node task3.js
```
Or copy and paste to browser console
