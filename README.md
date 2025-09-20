# Sweet Shop

## Description

A full-stack e-commerce application for buying and selling sweets.

## Tech Stack

*   Frontend: React, TypeScript, Vite
*   Backend: Node.js, TypeScript, Express, Mongoose

## Installation

1.  Clone the repository:

    ```bash
    git clone <repository_url>
    ```

2.  Install backend dependencies:

    ```bash
    cd backend-ts
    npm install
    ```

3.  Configure the backend:

    *   Create a `.env` file in the `backend-ts` directory with the following variables:

        ```
        MONGODB_URI=<your_mongodb_uri>
        JWT_SECRET=<your_jwt_secret>
        ```

4.  Run the backend:

    ```bash
    npm run dev
    ```

5.  Install frontend dependencies:

    ```bash
    cd ../frontend
    npm install
    ```

6.  Run the frontend:

    ```bash
    npm run dev
    ```

## Usage

1.  Open the application in your browser at `http://localhost:<frontend_port>`.
2.  Register a new account or log in with an existing account.
3.  Browse the available sweets and add them to your cart.
4.  Proceed to checkout and place your order.

## My AI Usage

*   **AI Tools Used:** AI Studio, Claude.
*   **How I Used Them:** AI Studio was used for project boiler template generation. Claude was used for backend logic, suggesting the use of MVC architecture.
*   **Reflection:** AI tools significantly accelerated the initial project setup and provided valuable architectural guidance, allowing for a more structured and efficient development process.
