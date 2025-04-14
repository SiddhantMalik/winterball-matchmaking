const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const indexRoutes = require('./routes/index');
const dateFinderRoutes = require('./routes/dateFinder');
const authRoutes = require('./routes/auth');

app.set('view engine', 'ejs');
app.set('views', './views');

// Middleware for serving static files and sessions
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'winterball-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 24 * 60 * 60 * 1000 } // 24 hours
}));

// Routes
app.use('/', indexRoutes);
app.use('/date-finder', dateFinderRoutes);
app.use('/auth', authRoutes);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});