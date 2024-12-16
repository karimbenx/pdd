const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

app.use(cors()); // Allow cross-origin requests
app.use(bodyParser.json()); // Parse JSON bodies

let users = []; // This will store users temporarily (in memory)

// Sign up route
app.post('/signup', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send('Username and password are required');
  }

  const userExists = users.find(user => user.username === username);
  if (userExists) {
    return res.status(400).send('Username already taken');
  }

  users.push({ username, password });
  return res.status(200).send('User registered successfully');
});

// Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(user => user.username === username && user.password === password);

  if (!user) {
    return res.status(400).send('Invalid username or password');
  }

  return res.status(200).send('Login successful');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
