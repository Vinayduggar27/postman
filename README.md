# Intro to Backend Development - Node.js, Express & MongoDB

This project is built following the [freeCodeCamp "Intro to Backend Web Development" Tutorial](https://www.youtube.com/watch?v=KOutPbKc9UM) by Shivani.

---

## 🚀 Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (via Mongoose ODM)
- **Security:** bcrypt (password hashing)
- **Environment:** dotenv
- **Development Tool:** nodemon
- **API Testing:** Postman

---

## 📁 Project Architecture (Model-Route-Controller)

```text
├── backend/
│   └── src/
│       ├── config/
│       │   ├── constants.js          # DB constants
│       │   └── database.js           # Mongoose connection logic
│       ├── controllers/
│       │   ├── post.controller.js    # CRUD handlers for posts
│       │   └── user.controller.js    # Register, login, logout handlers
│       ├── models/
│       │   ├── post.model.js         # Mongoose schema for posts
│       │   └── user.model.js         # Mongoose schema for users with bcrypt hashing
│       ├── routes/
│       │   ├── post.route.js         # Express routes for posts
│       │   └── user.route.js         # Express routes for auth
│       ├── app.js                    # Express app & route middleware
│       └── index.js                  # App bootstrap and database connection
├── postman/
│   └── backend_api_collection.json   # Ready-to-import Postman collection
├── .env.example                      # Example environment variables
├── .gitignore                        # Git ignore file
└── package.json
```

---

## ⚙️ Setup and Installation

### 1. Clone the repository
```bash
git clone https://github.com/Vinayduggar27/postman.git
cd postman
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure `.env`
Create a `.env` file in the root folder with:
```env
PORT=4000
MONGODB_URI="mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/intro-to-backend?retryWrites=true&w=majority"
```

### 4. Run the Server
- Development mode (with live reload):
  ```bash
  npm run dev
  ```
- Production mode:
  ```bash
  npm start
  ```

---

## 📡 API Endpoints

### 🔐 User Authentication (`/api/v1/users`)
| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| `POST` | `/api/v1/users/register` | Register a new user | `{ "username": "...", "email": "...", "password": "..." }` |
| `POST` | `/api/v1/users/login` | Login user | `{ "email": "...", "password": "..." }` |
| `POST` | `/api/v1/users/logout` | Logout user | `{ "email": "..." }` |

### 📝 Post CRUD Operations (`/api/v1/posts`)
| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| `POST` | `/api/v1/posts/create` | Create a new post | `{ "name": "...", "description": "...", "age": 22 }` |
| `GET` | `/api/v1/posts/getPosts` | Retrieve all posts | None |
| `PATCH` | `/api/v1/posts/update/:id` | Update post by ID | Any field to update |
| `DELETE`| `/api/v1/posts/delete/:id` | Delete post by ID | None |

---

## 🧪 Postman API Testing

1. Open the **Postman desktop app**.
2. Click **Import** (top left).
3. Select `postman/backend_api_collection.json`.
4. Run requests in this sequence:
   - **Register User** (`POST http://localhost:4000/api/v1/users/register`)
   - **Login User** (`POST http://localhost:4000/api/v1/users/login`)
   - **Create Post** (`POST http://localhost:4000/api/v1/posts/create`)
   - **Get All Posts** (`GET http://localhost:4000/api/v1/posts/getPosts`) -> copy the `_id` of the created post
   - **Update Post** (`PATCH http://localhost:4000/api/v1/posts/update/:id`) -> paste the `_id` into path parameter
   - **Delete Post** (`DELETE http://localhost:4000/api/v1/posts/delete/:id`)
