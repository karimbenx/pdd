const express = require('express');
const passport = require('passport');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const LocalStrategy = require('passport-local').Strategy;

// Initialize the app
const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
}));

// Connect to MongoDB (replace with your connection string)
mongoose.connect('mongodb://localhost:27017/passport-auth', { useNewUrlParser: true, useUnifiedTopology: true });

// Create User schema and model
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

// Passport.js configuration
passport.use(new LocalStrategy(
  async (username, password, done) => {
    try {
      const user = await User.findOne({ username });
      if (!user) return done(null, false, { message: 'Incorrect username.' });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return done(null, false, { message: 'Incorrect password.' });

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// Initialize Passport.js
app.use(passport.initialize());
app.use(passport.session());

// Routes

// Home route
app.get('/', (req, res) => {
  res.send('Welcome to Passport.js authentication!');
});

// Register route
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // Check if the user already exists
  const userExists = await User.findOne({ username });
  if (userExists) return res.status(400).send('User already exists.');

  // Hash the password and save the user
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashedPassword });

  await user.save();
  res.status(200).send('User registered successfully.');
});

// Login route
app.post('/login',
  passport.authenticate('local', { successRedirect: '/profile', failureRedirect: '/login' })
);

// Profile route (protected)
app.get('/profile', (req, res) => {
  if (!req.isAuthenticated()) return res.redirect('/login');
  res.send(`Welcome, ${req.user.username}!`);
});

// Logout route
app.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect('/');
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
