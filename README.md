# Todolist API

Welcome to Todolist API! This README file will guide you through the setup process and how to run the backend server.
## Prerequisites

Before you begin, make sure you have the following installed on your machine:

- Node.js
- MongoDB
- Prisma CLI

  ### Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/your-username/your-expo-app.git](https://github.com/3Akram2/Todolist-API.git


2. Navigate to project directory
   ```bash
     cd Todolist-API

   
3. Create a .env file in the root of the project and add the following environment variable:
   ```bash
        touch .env

   
## Environment Variables

Before running the backend server, you need to set up the following environment variables:

- `DATABASE_URL`: The connection string for your MongoDB database.
- `JWT_SECRET`: The secret key used for JSON Web Token (JWT) authentication.
- `PORT`: The port on which the backend server will run.

DATABASE_URL=mongodb://localhost:27017/your-database
JWT_SECRET=your-secret-key
PORT=3000

Replace the values with your actual database connection string, secret key, and desired port number.

## Database

This backend uses MongoDB as the database. Make sure you have MongoDB installed and running on your machine.

## Prisma ORM

This project uses Prisma ORM for database management. Make sure you have the Prisma CLI installed globally.

   ```bash
     npm install -g prisma
  ```


Then  generate Prisma client:
    ````bash
      npx prisma generate
    ````
  
## Installation

To install the dependencies, run the following command:

  ```bash
     npm install
 ```

To start the server , run the following command:

  ```bash
          npm start

