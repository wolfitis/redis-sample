const express = require('express');
// to fetch API data
const fetch = require('node-fetch');
const redis = require('redis');

const S_PORT = process.env.PORT || 3000;
const R_PORT = process.env.PORT || 6379;

const client = redis.createClient(R_PORT);

const app = express();

// View
const setResp = (username, repoCount) => {
  return `<h2>${username} has ${repoCount} public repositories.</h2>`;
}
// Helper functions
const getReposCount = async (req, res) => {
  try {
    const { username } = req.params;
    // fetching data from github API
    console.log(`Fetching data for ${username}`);
    const respone = await fetch(`https://api.github.com/users/${username}`);

    const data = await respone.json();

    const repoCount = data.public_repos;

    // Set data to redis
    // we use setex for setting data alongwith expiry (in secs)
    client.setex(username, 3600, repoCount);

    res.send(setResp(username, repoCount));
  } catch (err) {
    res.status(500).send(err);
  }
}

// Routes
app.get('/repos/:username', getReposCount);


app.listen(3000, () => {
  console.log(`App is running on port ${S_PORT}`);
});














