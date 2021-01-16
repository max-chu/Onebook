const express = require("express");
const request = require("request");

const axios = require("axios");
const accessTokens = new Set();

let client_id = "239174237774375";
let client_secret = "a79e01525c81dc1ac6c7cc1eb9140957";
let redirect_uri = "http://localhost:8888/callback";

const app = express();

// Route 1: UI to redirect the user to Facebook's login dialog
app.get("/", (req, res) => {
  res.send(`
    <html>
      <body>
        <a href="https://www.facebook.com/v6.0/dialog/oauth?client_id=${client_id}&r
edirect_uri=${encodeURIComponent("http://localhost:3000/oauth-redirect")}">
          Log In With Facebook
        </a>
      </body>
    </html>
  `);
});

// Route 2: Exchange auth code for access token
app.get("/oauth-redirect", async (req, res) => {
  try {
    const authCode = req.query.code;

    // Build up the URL for the API request. `client_id`, `client_secret`,
    // `code`, **and** `redirect_uri` are all required. And `redirect_uri`
    // must match the `redirect_uri` in the dialog URL from Route 1.
    const accessTokenUrl =
      "https://graph.facebook.com/v6.0/oauth/access_token?" +
      `client_id=${client_id}&` +
      `client_secret=${client_secret}&` +
      `redirect_uri=${encodeURIComponent(
        "http://localhost:3000/oauth-redirect"
      )}&` +
      `code=${encodeURIComponent(authCode)}&'scope=email user_friends`;

    // Make an API request to exchange `authCode` for an access token
    const accessToken = await axios
      .get(accessTokenUrl)
      .then((res) => res.data["access_token"]);
    // Store the token in memory for now. Later we'll store it in the database.
    console.log("Access token is", accessToken);
    accessTokens.add(accessToken);

    res.redirect(`/me?accessToken=${encodeURIComponent(accessToken)}`);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.response.data || err.message });
  }
});

// Route 3: Make requests to FB on behalf of the user
app.get("/me", async (req, res) => {
  try {
    const accessToken = req.query.accessToken;
    if (!accessTokens.has(accessToken)) {
      throw new Error(`Invalid access token "${accessToken}"`);
    }

    // Get the name and user id of the Facebook user associated with the
    // access token.
    const data = await axios
      .get(
        `https://graph.facebook.com/me/friends?access_token=${encodeURIComponent(
          accessToken
        )}`
      )
      .then((res) => res.data);

    console.log(data);
    console.log(data.id);

    return res.send(`
      <html>
        <body>Your name is ${data.name}</body> <br>
        <body>Your id is ${data.id}</body>
      </html>
    `);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.response.data || err.message });
  }
});

console.log("Listening on 3000");
app.listen(3000);

// // Route 3: Make requests to FB on behalf of the user
// app.get("/me", async (req, res) => {
//   try {
//     const accessToken = req.query.accessToken;
//     if (!accessTokens.has(accessToken)) {
//       throw new Error(`Invalid access token "${accessToken}"`);
//     }

//     // Get the name and user id of the Facebook user associated with the
//     // access token.
//     const data = await axios
//       .get(
//         `https://graph.facebook.com/me?access_token=${encodeURIComponent(
//           accessToken
//         )}`
//       )
//       .then((res) => res.data);

//     console.log(data.name);
//     console.log(data.id);

//     return res.send(`
//       <html>
//         <body>Your name is ${data.name}</body> <br>
//         <body>Your id is ${data.id}</body>
//       </html>
//     `);
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ message: err.response.data || err.message });
//   }
// });
