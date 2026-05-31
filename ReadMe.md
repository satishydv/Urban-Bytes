# 🍕 Urban Bites by Satish Yadav

✨ A full-stack web application designed for a pizza club, enabling customers to browse menus, place orders, and manage their profiles. The platform also includes robust administrative features for product, deal, customer, and order management, along with rider-specific functionalities for order delivery.

## 🛠️ Tech Stack

| Category | Technologies |
| :-- | :-- |
| **Languages** | ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) ![JSX](https://img.shields.io/badge/JSX-61DAFB?style=for-the-badge&logo=react&logoColor=black) |
| **Backend** | ![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white) ![Fastify](https://img.shields.io/badge/Fastify-393939?style=for-the-badge&logo=fastify&logoColor=white) |
| **Frontend** | ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-593D88?style=for-the-badge&logo=redux&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white) |
| **Database** | ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white) (Mongoose ODM) |
| **Authentication** | `JSON Web Tokens (JWT)` `Bcrypt.js` |
| **Cloud Services** | ![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white) |
| **Email** | `Nodemailer` |
| **Utilities** | `@fastify/multipart`, `@fastify/cors`, `@fastify/formbody`, `@fastify/rate-limit`, `react-router-dom`, `react-toastify`, `recharts` |

## 🧱 Project Structure

```
project-root/
│
├── BackEnd/
│   ├── configs/
│   │   ├── Cloudinary.js
│   │   └── ConnectDB.js
│   ├── controllers/
│   │   ├── Customer.controller.js
│   │   ├── Deals.controller.js
│   │   ├── Order.controller.js
│   │   ├── Product.controller.js
│   │   └── User.controller.js
│   ├── middlewares/
│   │   ├── IsAdminAuth.js
│   │   ├── IsRiderAuth.js
│   │   └── IsUserLoginAuth.js
│   ├── models/
│   │   ├── BlackListTokens.models.js
│   │   ├── Deals.models.js
│   │   ├── Order.models.js
│   │   ├── Product.models.js
│   │   ├── User.models.js
│   │   └── VerifyEmail.models.js
│   ├── routers/
│   │   ├── Customer.router.js
│   │   ├── Deals.router.js
│   │   ├── Order.router.js
│   │   ├── Product.router.js
│   │   └── User.router.js
│   ├── utils/
│   │   ├── orderEmailTem.js
│   │   └── sendEmails.js
│   ├── package.json
│   └── server.js
│
└── FrontEnd/
    ├── src/
    │   ├── App.jsx
    │   ├── Constants.js
    │   ├── Sections/
    │   ├── assets/
    │   ├── components/
    │   ├── dummy/
    │   ├── pages/
    │   │   ├── AboutUs.jsx
    │   │   ├── AddNewProduct.jsx
    │   │   ├── AllCustomers.jsx
    │   │   ├── AllOrder.jsx
    │   │   ├── AllProducts.jsx
    │   │   ├── CheckOut.jsx
    │   │   ├── Contact.jsx
    │   │   ├── Home.jsx
    │   │   ├── LoginAndSignUp.jsx
    │   │   ├── Menu.jsx
    │   │   ├── PageNotFound.jsx
    │   │   ├── Privacy.jsx
    │   │   ├── Settings.jsx
    │   │   ├── TermsOfServiecs.jsx
    │   │   ├── UpdateDeal.jsx
    │   │   ├── UpdateProduct.jsx
    │   │   └── UserProfile.jsx
    │   ├── store/
    │   │   ├── slices/
    │   │   └── store.js
    │   ├── utils/
    │   └── index.css
    ├── eslint.config.js
    ├── package.json
    └── vite.config.js
```

## ✨ Key Features

*   **User Authentication & Authorization**: Secure signup, login, and logout. Implements email verification for new users and role-based access control for User, Rider, and Admin roles using JWT.
*   **Product Management**: Comprehensive CRUD (Create, Read, Update, Delete) operations for food products, including image uploads to Cloudinary and product status management. Features server-side caching for improved performance.
*   **Deal Management**: Full CRUD capabilities for special deals with image uploads and activation status control. Also includes server-side caching for deals.
*   **Order Management**:
    *   **Customer**: Place new orders with multiple payment methods (COD, CARD, ONLINE), view order history, and cancel orders.
    *   **Admin**: View all orders, update order and payment statuses, and assign orders to riders.
    *   **Rider**: View assigned orders for delivery.
    *   Email notifications for order placement and status updates.
*   **Customer Management (Admin)**: View all customer accounts, filter by user roles, update user roles, and delete user accounts.
*   **Shopping Cart**: Functionality to add, remove, and update quantities of products and deals in a user's shopping cart.
*   **Responsive User Interface**: A dynamic and responsive frontend built with React and Tailwind CSS, ensuring optimal viewing across various devices.
*   **API Rate Limiting**: Backend protection against excessive requests using Fastify's rate limiting plugin.
*   **Centralized State Management**: Uses Redux Toolkit for efficient and predictable state management across the frontend application.

## 🔌 API Endpoints

### User & Authentication (`/api/auth`)

| HTTP Method | Route                  | Request Data                                 | Response                                                                 | Description                                                                                                                                              |
| :---------- | :--------------------- | :------------------------------------------- | :----------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `POST`      | `/signup`              | `email`, `name`, `password`, `profile`       | `success` (boolean), `message` (string)                                  | Registers a new user, hashes the password, creates a JWT token, and sends an email verification OTP.                                                     |
| `POST`      | `/login`               | `email`, `password`                          | `success` (boolean), `message` (string), `token` (string), `user` (object) | Authenticates a user with provided credentials and returns a JWT token if successful.                                                                     |
| `GET`       | `/bytoken`             | (Authorization: `Bearer <token>`)            | `success` (boolean), `message` (string), `data` (user object)            | Retrieves user details based on the provided JWT in the Authorization header.                                                                            |
| `GET`       | `/logout`              | (Authorization: `Bearer <token>`)            | `success` (boolean), `message` (string)                                  | Logs out the user by blacklisting the provided JWT token.                                                                                                |
| `POST`      | `/upload-image`        | `image` (multipart/form-data file)           | `success` (boolean), `message` (string), `url` (string), `ImageId` (string) | Uploads a user profile image to Cloudinary.                                                                                                              |
| `GET`       | `/verify-email`        | `otp` (query param), `email` (query param)   | `success` (boolean), `message` (string)                                  | Verifies a user's email address using the provided One-Time Password (OTP) and email from the verification link.                                         |

### Products (`/api/products`)

| HTTP Method | Route                  | Request Data                                 | Response                                                                 | Description                                                                                                                                              |
| :---------- | :--------------------- | :------------------------------------------- | :----------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET`       | `/all`                 | None                                         | `success` (boolean), `message` (string), `data` (array of product objects) | Retrieves all products. Responses are cached for improved performance.                                                                                   |
| `POST`      | `/upload-image`        | `image` (multipart/form-data file)           | `success` (boolean), `message` (string), `url` (string), `ImageId` (string) | Uploads a product image to Cloudinary. Requires Admin authentication.                                                                                    |
| `POST`      | `/create`              | `name`, `desc`, `category`, `prices` (array of objects), `stockStatus`, `url`, `ImageId` | `success` (boolean), `message` (string)                                  | Creates a new product. Requires Admin authentication.                                                                                                    |
| `POST`      | `/update-status`       | `id` (string), `status` (enum: `In Stock`, `Out Off Stock`, `Soon`) | `success` (boolean), `message` (string)                                  | Updates the stock status of a product by ID. Requires Admin authentication.                                                                              |
| `POST`      | `/:id`                 | None                                         | `success` (boolean), `message` (string)                                  | Deletes a product by ID. Requires Admin authentication.                                                                                                  |
| `GET`       | `/single/:id`          | None                                         | `success` (boolean), `message` (string), `data` (product object)         | Retrieves a single product by ID. Requires Admin authentication.                                                                                         |
| `POST`      | `/update/:id`          | `name`, `desc`, `category`, `prices` (array of objects), `stockStatus`, `url`, `ImageId` | `success` (boolean), `message` (string)                                  | Updates all fields of a product by ID. Requires Admin authentication.                                                                                    |

### Deals (`/api/deals`)

| HTTP Method | Route                  | Request Data                                 | Response                                                                 | Description                                                                                                                                              |
| :---------- | :--------------------- | :------------------------------------------- | :----------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET`       | `/all`                 | None                                         | `success` (boolean), `message` (string), `data` (array of deal objects)    | Retrieves all active deals. Responses are cached for improved performance.                                                                               |
| `GET`       | `/single/:id`          | None                                         | `success` (boolean), `message` (string), `data` (deal object)              | Retrieves a single deal by ID. Requires Admin authentication.                                                                                            |
| `POST`      | `/create`              | `title`, `description`, `image`, `price`, `isActive` | `success` (boolean), `message` (string)                                  | Creates a new special deal. Requires Admin authentication.                                                                                               |
| `POST`      | `/update-status/:id`   | `isActive` (boolean)                         | `success` (boolean), `message` (string)                                  | Updates the active status of a deal by ID. Requires Admin authentication.                                                                                |
| `GET`       | `/delete/:id`          | None                                         | `success` (boolean), `message` (string)                                  | Deletes a deal by ID. Requires Admin authentication.                                                                                                     |
| `POST`      | `/update/:id`          | `title`, `description`, `image`, `price`, `isActive` | `success` (boolean), `message` (string)                                  | Updates all fields of a deal by ID. Requires Admin authentication.                                                                                       |

### Orders (`/api/orders`)

| HTTP Method | Route                  | Request Data                                 | Response                                                                 | Description                                                                                                                                              |
| :---------- | :--------------------- | :------------------------------------------- | :----------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET`       | `/all`                 | (Authorization: `Bearer <token>`, Admin)     | `success` (boolean), `message` (string), `data` (array of order objects) | Retrieves all orders placed on the platform. Requires Admin authentication.                                                                              |
| `POST`      | `/update-order-status/:id` | `orderStatus` (enum: `placed`, `confirmed`, `preparing`, `OnTheWay`, `delivered`, `cancelled`) | `success` (boolean), `message` (string), `data` (updated order object) | Updates the status of an order by ID. Requires Admin authentication.                                                                                     |
| `POST`      | `/update-payment-status/:id` | `paymentStatus` (enum: `paid`, `unpaid`)     | `success` (boolean), `message` (string), `data` (updated order object) | Updates the payment status of an order by ID. Requires Admin authentication.                                                                             |
| `POST`      | `/assgin-rider/:id`    | `riderId` (string)                           | `success` (boolean), `message` (string)                                  | Assigns a rider to an order by ID. Requires Admin authentication.                                                                                        |
| `POST`      | `/create`              | `items` (array of product/deal objects), `paymentMethod`, `deliveryAddress`, `contactNumber`, `totalPrice`, `orderStreet`, `orderCity` | `success` (boolean), `message` (string)                                  | Creates a new order. Requires User authentication and email verification.                                                                                |
| `GET`       | `/me`                  | (Authorization: `Bearer <token>`, User)      | `success` (boolean), `message` (string), `data` (array of user's orders) | Retrieves all orders placed by the currently authenticated user.                                                                                         |
| `GET`       | `/rider/me`            | (Authorization: `Bearer <token>`, Rider)     | `success` (boolean), `message` (string), `data` (array of rider's orders) | Retrieves all orders assigned to the currently authenticated rider.                                                                                      |
| `GET`       | `/cancel/:id`          | (Authorization: `Bearer <token>`, User)      | `success` (boolean), `message` (string)                                  | Cancels an order by ID. Requires User authentication.                                                                                                    |

### Customers (`/api/customers`)

| HTTP Method | Route                  | Request Data                                 | Response                                                                 | Description                                                                                                                                              |
| :---------- | :--------------------- | :------------------------------------------- | :----------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET`       | `/all`                 | (Authorization: `Bearer <token>`, Admin)     | `success` (boolean), `message` (string), `data` (array of user objects)  | Retrieves all customer accounts (users with any role). Requires Admin authentication.                                                                    |
| `GET`       | `/riders`              | (Authorization: `Bearer <token>`, Admin)     | `success` (boolean), `message` (string), `data` (array of rider objects) | Retrieves all user accounts with the role "rider". Requires Admin authentication.                                                                        |
| `POST`      | `/update-role/:id`     | `id` (string), `role` (enum: `user`, `admin`, `rider`) | `success` (boolean), `message` (string)                                  | Updates the role of a user by ID. Requires Admin authentication.                                                                                         |
| `GET`       | `/delete/:id`          | None                                         | `success` (boolean), `message` (string)                                  | Deletes a user account by ID. Requires Admin authentication.                                                                                             |

## 🚀 Setup Instructions

To run this project locally, follow these steps:

### 📦 Installation

1.  **Clone the repository**:

    ```bash
    git clone https://github.com/hassaanhaider88/PunjabPizzaClub
    cd PunjabPizzaClub
    ```

2.  **Install backend dependencies**:

    ```bash
    cd BackEnd
    npm install
    ```

3.  **Install frontend dependencies**:

    ```bash
    cd ../FrontEnd
    npm install
    ```

### 🔐 Environment Variables

Create a `.env` file in the `BackEnd` directory with the following variables:

```
PORT=3000
MONGODB_URL=
JWT_SECRET_KEY=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
EMAIL_USER=
EMAIL_PASS=
SERVER_URL=http://localhost:3000
```

*   **`PORT`**: The port for the backend server to run on.
*   **`MONGODB_URL`**: Your MongoDB connection string.
*   **`JWT_SECRET_KEY`**: A strong secret key for signing JWT tokens.
*   **`CLOUDINARY_CLOUD_NAME`**: Your Cloudinary cloud name.
*   **`CLOUDINARY_API_KEY`**: Your Cloudinary API key.
*   **`CLOUDINARY_API_SECRET`**: Your Cloudinary API secret.
*   **`EMAIL_USER`**: The email address for sending verification and order emails (e.g., Gmail address).
*   **`EMAIL_PASS`**: The app password or regular password for the `EMAIL_USER`.
*   **`SERVER_URL`**: The base URL of your backend server (e.g., `http://localhost:3000`).

### ▶️ Run the Project

1.  **Start the Backend Server**:

    ```bash
    cd BackEnd
    npm run dev
    # or for production
    # npm start
    ```

2.  **Start the Frontend Development Server**:

    ```bash
    cd ../FrontEnd
    npm run dev
    # or for production build
    # npm run build
    # npm preview
    ```

The frontend application will typically be accessible at `http://localhost:5173` (or another port specified by Vite) and will connect to the backend running on `http://localhost:3000`.