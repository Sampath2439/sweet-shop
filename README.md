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

## API Documentation

### Overview

The API provides endpoints for user authentication, managing sweets, and handling orders. It uses JSON Web Tokens (JWT) for authentication and MongoDB for data storage.

### Authentication

*   **Register User:** `POST /api/auth/register`
    *   Request Body:
        ```json
        {
            "email": "<user_email>",
            "password": "<user_password>"
        }
        ```
    *   Response Body:
        ```json
        {
            "id": "<user_id>",
            "email": "<user_email>",
            "role": "<user_role>",
            "token": "<jwt_token>"
        }
        ```
*   **Login User:** `POST /api/auth/login`
    *   Request Body:
        ```json
        {
            "email": "<user_email>",
            "password": "<user_password>"
        }
        ```
    *   Response Body:
        ```json
        {
            "id": "<user_id>",
            "email": "<user_email>",
            "role": "<user_role>",
            "token": "<jwt_token>"
        }
        ```
    *   To access protected routes, include the JWT token in the `Authorization` header as a Bearer token: `Authorization: Bearer <jwt_token>`.

### Sweets

*   **Get All Sweets:** `GET /api/sweets`
    *   Response Body:
        ```json
        [
            {
                "_id": "<sweet_id>",
                "name": "<sweet_name>",
                "description": "<sweet_description>",
                "price": <sweet_price>,
                "imageUrl": "<sweet_image_url>"
            }
        ]
        ```
*   **Add Sweet (Admin only):** `POST /api/sweets`
    *   Request Body:
        ```json
        {
            "name": "<sweet_name>",
            "description": "<sweet_description>",
            "price": <sweet_price>,
            "imageUrl": "<sweet_image_url>"
        }
        ```
    *   Response Body:
        ```json
        {
            "_id": "<sweet_id>",
            "name": "<sweet_name>",
            "description": "<sweet_description>",
            "price": <sweet_price>,
            "imageUrl": "<sweet_image_url>"
        }
        ```
*   **Update Sweet (Admin only):** `PUT /api/sweets/:id`
    *   Request Body:
        ```json
        {
            "name": "<sweet_name>",
            "description": "<sweet_description>",
            "price": <sweet_price>,
            "imageUrl": "<sweet_image_url>"
        }
        ```
    *   Response Body:
        ```json
        {
            "_id": "<sweet_id>",
            "name": "<sweet_name>",
            "description": "<sweet_description>",
            "price": <sweet_price>,
            "imageUrl": "<sweet_image_url>"
        }
        ```
*   **Delete Sweet (Admin only):** `DELETE /api/sweets/:id`
    *   Response Body:
        ```json
        {
            "message": "Sweet deleted"
        }
        ```

### Orders

*   **Create Order:** `POST /api/orders`
    *   Request Body:
        ```json
        {
            "orderItems": [
                {
                    "sweet": "<sweet_id>",
                    "purchaseQuantity": <quantity>
                }
            ],
            "totalPrice": <total_price>
        }
        ```
    *   Response Body:
        ```json
        {
            "_id": "<order_id>",
            "orderItems": [
                {
                    "sweet": "<sweet_id>",
                    "purchaseQuantity": <quantity>
                }
            ],
            "totalPrice": <total_price>,
            "user": "<user_id>"
        }
        ```
*   **Get My Orders:** `GET /api/orders/myorders`
    *   Response Body:
        ```json
        [
            {
                "_id": "<order_id>",
                "orderItems": [
                    {
                        "sweet": "<sweet_id>",
                        "purchaseQuantity": <quantity>
                    }
                ],
                "totalPrice": <total_price>,
                "user": "<user_id>"
            }
        ]
        ```
*   **Get Cart:** `GET /api/orders/cart`
     *   Response Body:
        ```json
        [
            {
                "sweet": "<sweet_id>",
                "purchaseQuantity": <quantity>
            }
        ]
        ```
*   **Save Cart:** `POST /api/orders/cart`
     *   Request Body:
        ```json
       [
            {
                "sweet": "<sweet_id>",
                "purchaseQuantity": <quantity>
            }
        ]
        ```
     *   Response Body:
        ```json
        {
            "message": "Cart saved"
        }
        ```

### MongoDB

The application uses MongoDB to store user, sweet, and order data. Mongoose is used as the ODM (Object Data Modeling) library to interact with the database. The models are defined in the `backend-ts/src/models/` directory.

### JWT

JSON Web Tokens (JWT) are used for authentication and authorization. When a user registers or logs in, a JWT is generated and returned to the client. The client then includes this token in the `Authorization` header of subsequent requests to protected routes. The backend verifies the token using the `JWT_SECRET` environment variable.

## My AI Usage

*   **AI Tools Used:** AI Studio, Claude.
*   **How I Used Them:** AI Studio was used for project boiler template generation. Claude was used for backend logic, suggesting the use of MVC architecture.
*   **Reflection:** AI tools significantly accelerated the initial project setup and provided valuable architectural guidance, allowing for a more structured and efficient development process.


## Deployed Using Vercel

**Deployment Link :** https://sweet-shop-drab.vercel.app/#/

## Admin Access

**ID :** admin@gmail.com

**Password :** admin123
