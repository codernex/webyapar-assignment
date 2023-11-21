const express = require("express");
const { verifyToken } = require("./auth");
const mongoose = require("mongoose");
const { User } = require("./models/user");

const app = express();

// Loading static files
app.use(express.json());
app.use(express.urlencoded({ limit: "1000mb", extended: true }));
app.use(express.static("upload"));
app.use(express.static("public"));

app.post("/verify-user", verifyToken, (req, res) => {
  res.status(200).json({
    success: true,
    message: "user verified",
  });
});

app.get("/user-images", verifyToken, async (req, res) => {
  const user = await User.findOne({ email: req.user.email });
  res.status(200).json({ data: user.images });
});

app.post("/upload", verifyToken, async (req, res) => {
  await User.findOneAndUpdate(
    { email: req.user.email },
    {
      $push: {
        images: [
          {
            image: req.body.image,
          },
        ],
      },
    }
  );
  res.redirect("images.html");
});

app.use((err, req, res, next) => {
  res.status(500).json({
    success: false,
    message: err.message,
  });
});

mongoose
  .connect(
    "mongodb+srv://borhan_wsl:66043322Ab-@cluster0.sifxy.mongodb.net/webyapar?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("database connected");
  })
  .then(() => {
    app.listen(3000, () => {
      console.log("Server is running");
    });
  });
