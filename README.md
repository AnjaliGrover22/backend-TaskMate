# Project Structure :backend-TaskMate

## Create A backend-TaskMate Repo

### Following are the folders in our repo

- controllers
- db
- routes
- schemas

### Following are the files in our repo

- .env
- .gitignore
- package-lock-json
- package.json
- README.md
- server.js

### Very Important step :

- Don't forget to put `.env` file and node_modules in `.gitignore` file.

- Create a git Repo and follow the steps of Github.

### Commands to install all dependencies which we required for backend project

- step 1 : install `npm init -y ` it will create package.json file
- step 2 : install other depenencies which is required for backend development \
  `npm install express cors mongoose dotenv cloudinary multer multer-storage-cloudinary`
- step 3 : install dev depenencies
  `npm i nodemon colors -D`
  Lists the external packages (dependencies) required for your project to run.
  Let’s break down the dependencies:
  - "cloudinary": "^1.41.3":
    Used for working with Cloudinary, a cloud-based image and video management service.
  - "cors": "^2.8.5":
    Enables Cross-Origin Resource Sharing (CORS) for handling requests from different origins.
  - "dotenv": "^16.4.5":
    Loads environment variables from a .env file into your application.
  - "express": "^4.19.2":
    The core framework for building your API.
  - "mongoose": "^8.6.1":
    An ODM (Object Data Modeling) library for MongoDB, allowing you to define schemas and interact with the database.
  - "multer": "^1.4.5-lts.1":
    Middleware for handling file uploads (used for images, etc.).
  - "multer-storage-cloudinary": "^4.0.0":
    Integrates Multer with Cloudinary for storing uploaded files.
  - "nodemon": "^3.1.4":
    Automatically restarts your server during development when files change.
  - "devDependencies":
    Lists development-specific dependencies (not needed in production).
  - "colors": "^1.4.0":
    Adds color to console logs during development (helpful for debugging).

### Create a MongoDB Database Connection

- Mongodb Link https://www.mongodb.com/atlas

### First craete important files

- create `.env ` file
- create `.gitignore ` file
- create `server.js` File
- create `dbinit.js ` file inside `db` folder
