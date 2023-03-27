const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const User = require('./models/user');

mongoose.connect('mongodb://127.0.0.1:27017/myapp', { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();

app.set('view engine', 'hbs');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/register', (req, res) => {
  res.render('register');
});

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = new User({ username, password });
    await user.save();
    req.session.user = user;
    res.redirect('/login');
  } catch (err) {
    res.render('register', { error: 'Username already exists' });
  }
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error();
    }
    user.comparePassword(password, (err, isMatch) => {
      if (err || !isMatch) {
        throw new Error();
      }
      req.session.user = user;
      res.redirect('/dashboard');
    });
  } catch (err) {
    res.render('login', { error: 'Invalid username or password' });
  }
});

app.get('/dashboard', (req, res) => {
  const { user } = req.session;
  if (!user) {
    res.redirect('/login');
  } else {
    res.render('dashboard', { user });
  }
});

mongoose.connection.once('open', () => {
  console.log('Connected to database');
  app.listen(3000, () => {
    console.log('Server started on port 3000');
  });
});
