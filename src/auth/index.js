const { OAuth2Client } = require("google-auth-library");
const axios = require("axios");
const { User } = require("../models/user");

const CLIENT_ID =
  "619975114758-bubcolgsebdvfm0cvjfjqdiu7u5rq6u7.apps.googleusercontent.com"; // Replace with your actual client ID
const client = new OAuth2Client(CLIENT_ID);

async function verifyToken(req, res, next) {
  try {
    const token = req.headers.authorization;

    const res = await axios.get(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: {
          Authorization: token,
        },
      }
    );

    const userExist = await User.findOne({ email: res.data.email });
    let user;
    if (!userExist) {
      user = await User.create({
        email: res.data.email,
        name: res.data.name,
        picture: res.data.picture,
      });
    } else {
      user = userExist;
    }

    req.user = user;
    next();
  } catch (err) {
    return next(new Error(err.message));
  }
}

module.exports = {
  verifyToken,
};
