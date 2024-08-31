# AzoraApp

AzoraApp is a full-stack application that provides authentication and manages user data using a REST API. This project is built with React for the frontend, Node.js/Express for the backend, and MongoDB for the database.

## Features

- User authentication (signup, login)
- Password hashing for security
- JWT (JSON Web Token) for secure API access
- Fetch data from an external API
- CRUD operations on user data

Table of Contents
Installation
Backend Setup
Frontend Setup
Usage
API Endpoints
Contributing
License

## Installation

### Backend

1. Clone the repository:

git clone https://github.com/mohamed45/AzoraApp.git
cd AzoraApp

2.  Navigate to the backend directory:

cd AzoraApp/backend

3. Install the backend dependencies:

npm install

4. Create a .env file in the backend directory with the following content:

JWT_SECRET=azoraSecretKey123!
MONGODB_URI=mongodb+srv://younis:mohamed150@clusterudemy.gj0xv.mongodb.net/azoraTestDB

5. Start the backend server:

npm start

Frontend

1. Navigate to the frontend directory:

cd AzoraApp/frontend

2. Install the frontend dependencies:

npm install

3. Start the frontend development server:

npm start

Usage

- Backend: The backend server runs on http://localhost:5000.
- Frontend: The frontend development server runs on http://localhost:3000.

Authentication

- Signup: `POST /api/signup`
- Login: `POST /api/login`

API Endpoints

- Signup

- Endpoint: /api/signup
- Method: POST
- Request Body:
  {
  email": "user@example.com",
  password": "password123"
  }
- Response:
  {
  "newUser": {
  "email": "user@example.com",
  "password": "hashed password",
  "\_id": "genratedID",
  "\_\_v": 0
  }
  }
Login
 - Endpoint: `/api/login`
 - Method: POST
 - Request Body:
    {
   "email": "user@example.com",
   "password": "password123"
   }
 - Response:
    {
    "userId": "genaretedId",
    "email": "user@example.com",
    "token": "<jwt_token>"
    }

 - Contributing
      Feel free to open issues or pull requests. For major changes, please open an issue first to discuss what you would like to change.
