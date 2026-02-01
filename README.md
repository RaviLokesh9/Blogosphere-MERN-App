# BLOGOSPHERE MERN APPLICATION

## Table of Contents

- [Introduction](#introduction)
- [Technologies Used](#technologies-used)
- [File Structure](#file-structure)
- [Installation Guide](#installation-guide)

## Introduction

Welcome to **Blogosphere** - your go-to destination for a feature-rich and immersive blogging experience! 🚀 In the vast landscape of the internet, Blogosphere stands out as a meticulously designed blog application created using the MERN stack. Whether you're an avid writer or an enthusiastic reader, Blogosphere is tailored to meet your blogging needs with style and functionality.



## Technology Stack

⚙️ **Blogosphere is built on the MERN stack:**

- **MongoDB:** For a flexible and scalable database to handle blog data efficiently.
- **Express.js:** For building a robust and scalable backend to manage blog operations.
- **React.js:** For creating a dynamic and interactive user interface.
- **Node.js:** For running the server-side logic and handling backend requests.
- **JWT, Bcryptjs, Cookies:** Ensuring secure user authentication and authorization.

Blogosphere combines these technologies to create a powerful and enjoyable blogging platform. Dive into the world of Blogosphere and let your blogging journey begin! 🌐✨

## File Structure

📂 The front-end part is structured as follows:

```
└── 📁client
    └── .env
    └── .env.example
    └── .gitignore
    └── package-lock.json
    └── package.json
    └── 📁public
        └── blogosphere-logo.png
        └── blogosphere-white-logo.png
        └── index.html
        └── logo.png
        └── manifest.json
        └── robots.txt
    └── 📁src
        └── App.js
        └── 📁css
            └── App.css
            └── contact.css
            └── forms.css
            └── home.css
            └── index.css
        └── index.js
        └── 📁pages
            └── BlogsPage.js
            └── Contact.jsx
            └── CreatePost.js
            └── EditPost.js
            └── IndexPage.jsx
            └── LoginPage.js
            └── PostPage.js
            └── RegisterPage.js
        └── 📁partials
            └── Footer.js
            └── Layout.js
            └── NavBar.js
            └── Post.js
        └── 📁utils
            └── Editor.js
            └── UserContext.js
```

📂 The back-end part is structured as follows:

```
└── 📁server
    └── .env
    └── .gitignore
    └── index.js
    └── 📁models
        └── Post.js
        └── User.js
    └── package-lock.json
    └── package.json
    └── 📁uploads
```

## Installation Guide

🚀 Follow these steps to install and run the Awesome Project:

#### A. Client (Frontend) Installation:

1. **Navigate to the client folder:**

   ```bash
   cd client
   ```

2. **Install Frontend Dependencies:**

   ```bash
   npm install
   ```

3. **Configure Environment Variables:**

   - Rename the `.env.example` file to `.env`.
   - Open the `.env` file and add your server API base link:
     ```env
     REACT_APP_API_BASE_URL=http://your-server-api-link
     ```

4. **Start the Development Server:**
   ```bash
   npm start
   ```
   This will launch the client application on `http://localhost:3000`.

#### B. Server (Backend) Installation:

1. **Navigate to the server folder:**

   ```bash
   cd server
   ```

2. **Install Backend Dependencies:**

   ```bash
   npm install
   ```

3. **Configure Environment Variables:**

   - Rename the `.env.example` file to `.env`.
   - Open the `.env` file and add your MongoDB URI and JWT secret:
     ```env
     MONGO_URI=mongodb://your-mongo-uri
     JWT_SECRET=your-jwt-secret
     ```

4. **Run the Server for Development:**

   ```bash
   npm run dev
   ```

   This will start the server in development mode.

5. **Run the Server for Production:**
   ```bash
   npm start
   ```
   Use this command when deploying the server in a production environment.

Now, both the client and server are installed and running. You can access the frontend on `http://localhost:3000`, and the backend will be running according to your specified configuration (by default on `http://localhost:4000`).



