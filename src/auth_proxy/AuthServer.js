const express = require('express');
const cors = require('cors');
const axios = require('axios');
const qs = require('querystring');
const app = express();

app.use(cors());

let tokenCache = {
  token: null,
  expiry: null
};

app.get('/get-token', async (req, res) => {
  console.log("Fetching new token...");

  const username = "user";
  const password = "test";
  const client_id = "employee-management-service";
  const uri = "http://keycloak.szut.dev/auth/realms/szut/protocol/openid-connect/token";

  const body = qs.stringify({
    grant_type: "password",
    client_id: client_id,
    username: username,
    password: password
  });

  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }

  // Check if token is in cache and not expired
  if (tokenCache.token && new Date() < tokenCache.expiry) {
    console.log("Using cached token");
    res.send(tokenCache.token);
  } else {
    try {
      const result = await axios.post(uri, body, config);
      const formatted = JSON.stringify(result.data);
      console.log(`Result: ${formatted}`);

      // Store token and expiry in cache
      tokenCache.token = formatted;
      tokenCache.expiry = new Date(new Date().getTime() + result.data.expires_in * 1000);

      res.send(formatted);
    } catch (error) {
      console.error(`Error occurred: ${error.message}`);
      res.send(error.message);
    }
  }
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
