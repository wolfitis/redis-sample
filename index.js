const express = require('express');
// to fetch API data
const fetch = require('node-fetch');
const redis = require('redis');

const S_PORT = process.env.PORT || 3000;
const R_PORT = process.env.PORT || 6379;

const client = redis.createClient(R_PORT);

const app = express();

// Helper functions
const getReposCount = async (req, res) => {
  try {
    const { username } = req.params;
    // fetching data from github API
    console.log(`Fetching data for ${username}`);
    const respone = await fetch(`https://api.github.com/users/${username}`);

    const data = await respone.json();

    res.send(data);
  } catch (err) {
    res.status(500).send(err);
  }
}

// Routes
app.get('/repos/:username', getReposCount);


app.listen(3000, () => {
  console.log(`App is running on port ${S_PORT}`);
});














