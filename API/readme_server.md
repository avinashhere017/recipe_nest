# Recipe Nest

Recipe Nest is a web application that allows users to create, save, and manage recipes. This repository contains the server-side code for the application.

## Features

- User Registration and Login
- Create, Read, Update, and Delete Recipes
- Save and Manage Favorite Recipes
- JWT Authentication for Secure Access

## Technologies Used

- Node.js
- Express.js
- MongoDB (with Mongoose)
- JWT for Authentication
- bcrypt for Password Hashing
- dotenv for Environment Variables
- CORS for Handling Cross-Origin Requests

## Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB installed and running

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/recipe-nest.git
    cd recipe-nest
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add the following:

    ```env
    MONGODB_URL=your-mongodb-connection-string
    JWT_SECRET=your-jwt-secret
    ```

4. Start the server:

    ```bash
    npm start
    ```

    The server will run on `http://localhost:3000`.

## API Endpoints

### User Routes

- `POST /api/register`: Register a new user
- `POST /api/login`: Login a user
- `GET /api/user`: Get the authenticated user's profile
- `POST /api/logout`: Logout the user

### Recipe Routes

- `POST /api/add`: Create a new recipe (requires authentication)
- `GET /api`: Get all recipes
- `GET /api/saved`: Get saved recipes for the authenticated user
- `GET /api/:id`: Get a recipe by its ID
- `GET /api/user/:id`: Get recipes by user ID
- `POST /api/:id`: Save a recipe by its ID (requires authentication)
- `PUT /api/update/:id`: Update a recipe (requires authentication)
- `DELETE /api/delete/:id`: Delete a recipe (requires authentication)
- `DELETE /api/saved/:id`: Remove a saved recipe (requires authentication)

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any changes.

## License

This project is licensed under the MIT License.
