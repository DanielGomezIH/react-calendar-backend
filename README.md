# 📅 Calendary Backend

This is the backend for the Calendary application, a modern and simple calendar app. The backend is built with Node.js and Express, providing a RESTful API for managing calendar events, user authentication, and more.

## ✨ Features

- **User Authentication**: JWT-based authentication with secure login and registration.
- **Event Management**: Create, update, delete, and view calendar events.
- **JWT Validation**: Secure API endpoints with token validation.

## 🛠️ Technologies Used

- **Node.js**: Server-side JavaScript runtime.
- **Express**: Web framework for Node.js.
- **MongoDB**: NoSQL database for storing user data and events.
- **Mongoose**: ODM for interacting with MongoDB.
- **JWT**: JSON Web Tokens for user authentication.
- **Render**: Deployment platform for the backend.

## 🚀 Getting Started

### Prerequisites

- **Node.js**: Ensure you have Node.js installed.
- **MongoDB**: Set up a MongoDB database (e.g., MongoDB Atlas).
- **Render Account**: For deployment (optional).

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/calendary-backend.git
   cd calendary-backend
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:

   Create a `.env` file in the root directory and add the following environment variables:

   ```env
   PORT=4000
   DB_CNN=your_mongodb_connection_string
   SECRET_JWT_SEED=your_secret_jwt_seed
   ```

### Running the Application

1. **Start the server**:

   ```bash
   npm start
   ```

2. The API will be running at `http://localhost:4000/api`.

### API Endpoints

Here are some of the key endpoints:

- **User Authentication**:
  - `POST /api/auth/register` - Register a new user.
  - `POST /api/auth/login` - Log in an existing user.
- **Event Management**:
  - `GET /api/events` - Get all events.
  - `POST /api/events` - Create a new event.
  - `PUT /api/events/:id` - Update an event.
  - `DELETE /api/events/:id` - Delete an event.

### Deployment

1. **Deploy on Render**:

   - Follow the instructions on [Render's website](https://render.com/) to deploy your backend.

2. **Set Environment Variables**:

   - Make sure to set your environment variables in the Render dashboard.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## Contact

If you have any questions or suggestions, feel free to reach out:

- **Email**: your.email@example.com
- **GitHub**: [yourusername](https://github.com/yourusername)
