const express = require('express');
// to fetch API data
const fetch = require('node-fetch');
const redis = require('redis');

const S_PORT = process.env.PORT || 3000;
const R_PORT = process.env.PORT || 6379;

const client = redis.client(R_PORT);

const app = express();



// Routes
app.get('/repos/:username', getReposCount);


app.listen(3000, () => {
  console.log(`App is running on port ${S_PORT}`);
});














