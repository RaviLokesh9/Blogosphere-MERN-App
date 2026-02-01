const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
const Post = require("./models/Post");
const bcrypt = require("bcryptjs");
const app = express();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const uploadMiddleware = multer({ dest: "uploads/" });
const fs = require("fs");
require("dotenv").config();

const salt = bcrypt.genSaltSync(10);
const defaultkey = "asdfe45we45w345wegw345werjktjwertkj";
const secret = process.env.SECRET || defaultkey;


app.use(cors({
  credentials: true,
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (
      origin === "http://localhost:3000" ||
      origin.startsWith("http://192.168.")
    ) {
      return callback(null, true);
    }
    callback(new Error("Not allowed by CORS"));
  }
}));

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

/* ---------------- AUTH ROUTES ---------------- */

app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userDoc);
  } catch (error) {
    res.status(400).json({ error: "Registration failed" });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await User.findOne({ username });

  if (!userDoc) {
    return res.status(400).json("wrong credentials");
  }

  const passOk = bcrypt.compareSync(password, userDoc.password);

  if (!passOk) {
    return res.status(400).json("wrong credentials");
  }

  jwt.sign(
    { username, id: userDoc._id },
    secret,
    { expiresIn: "1h" },
    (err, token) => {
      if (err) {
        return res.status(500).json({ error: "JWT error" });
      }
      res.cookie("token", token, {
  httpOnly: true,
  sameSite: "lax",   // IMPORTANT
}).json({
  id: userDoc._id,
  username,
});

    }
  );
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ error: "No token" });
  }

  jwt.verify(token, secret, {}, (err, info) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" });
    }
    res.json(info);
  });
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok");
});

/* ---------------- POSTS ---------------- */

/* ✅ CREATE POST (FIXED) */
app.post("/post", uploadMiddleware.single("file"), async (req, res) => {
  try {
    // 🔍 STEP 5: DEBUG LINE (ADD THIS)
    console.log("COOKIE TOKEN RECEIVED:", req.cookies.token);

    // 🔴 FIX: Check if file exists
    if (!req.file) {
      return res.status(400).json({ error: "Image file is required" });
    }

    const { originalname, path } = req.file;
    const ext = originalname.split(".").pop();
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);

    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    jwt.verify(token, secret, {}, async (err, info) => {
      if (err) {
        return res.status(401).json({ error: "Invalid token" });
      }

      const { title, summary, content } = req.body;

      const postDoc = await Post.create({
        title,
        summary,
        content,
        cover: newPath,
        author: info.id,
      });

      res.json(postDoc);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create post" });
  }
});


/* ✅ UPDATE POST (ALREADY SAFE, SLIGHTLY CLEANED) */
app.put("/post", uploadMiddleware.single("file"), async (req, res) => {
  try {
    let newPath = null;

    if (req.file) {
      const { originalname, path } = req.file;
      const ext = originalname.split(".").pop();
      newPath = path + "." + ext;
      fs.renameSync(path, newPath);
    }

    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    jwt.verify(token, secret, {}, async (err, info) => {
      if (err) {
        return res.status(401).json({ error: "Invalid token" });
      }

      const { id, title, summary, content } = req.body;
      const postDoc = await Post.findById(id);

      if (!postDoc) {
        return res.status(404).json({ error: "Post not found" });
      }

      const isAuthor =
        JSON.stringify(postDoc.author) === JSON.stringify(info.id);

      if (!isAuthor) {
        return res.status(403).json("you are not the author");
      }

      await postDoc.updateOne({
        title,
        summary,
        content,
        cover: newPath ? newPath : postDoc.cover,
      });

      res.json(postDoc);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update post" });
  }
});

/* ---------------- FETCH POSTS ---------------- */

app.get("/post", async (req, res) => {
  const posts = await Post.find()
    .populate("author", ["username"])
    .sort({ createdAt: -1 })
    .limit(20);

  res.json(posts);
});

app.get("/post/:id", async (req, res) => {
  const postDoc = await Post.findById(req.params.id).populate(
    "author",
    ["username"]
  );
  res.json(postDoc);
});

/* ---------------- SERVER ---------------- */

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
