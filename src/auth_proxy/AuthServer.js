const express = require('express');
const cors = require('cors');
const axios = require('axios');
const qs = require('querystring');
const app = express();

app.use(cors());

app.get('/get-token', (req, res) => {
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

  axios.post(uri, body, config)
    .then((result) => {
      const formatted = JSON.stringify(result.data);
      console.log(`Result: ${formatted}`);
      res.send(formatted);
    })
    .catch((error) => {
      console.error(`Error occurred: ${error.message}`);
      res.send(error.message);
    });
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
