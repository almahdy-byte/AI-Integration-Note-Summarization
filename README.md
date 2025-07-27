# 🧠 Smart Note App

Smart Note App is a backend-powered note-taking system that allows users to create, manage, and analyze notes using artificial intelligence.  
It supports user authentication, image uploads, AI-based note summarization, and GraphQL APIs.

---

## 🔧 Tech Stack

- **Node.js + Express.js**
- **MongoDB + Mongoose**
- **JWT (Authentication with RSA keys)**
- **GraphQL API**
- **OpenAI API (for note summarization)**
- **Multer (for profile image upload)**
- **dotenv, bcrypt, helmet, cors, etc.**

---

## 🚀 Features

- ✅ User registration and login with JWT-based auth
- ✅ Upload and store profile pictures securely
- ✅ Create, read, update, and delete notes via GraphQL
- ✅ AI-powered summarization using OpenAI API
- ✅ Secure MongoDB data storage
- ✅ Token revocation and validation using custom middleware

---

## 📁 Project Structure

```bash
src/
├── modules/
│   ├── authModule/
│   │   ├── auth.routes.js
│   │   ├── auth.controller.js
│   │   └── auth.validation.js
│   ├── notesModule/
│   │   ├── notes.routes.js
│   │   ├── notes.controller.js
│   │   └── notes.validation.js
│   └── graphql/
│       ├── notes.graphql.js
│       ├── notes.graphql.controller.js
│       └── notes.graphql.type.js
├── middleware/
│   ├── auth.middleware.js
│   └── validation.middleware.js
├── utils/
│   └── (helper functions)
├── db/
│   ├── connection.js
│   └── models/
├── uploads/
│   └── (profile images)
└── index.js
