const User = require('../models/user');

// Display registration page
exports.getRegisterPage = (req, res) => {
  res.render('register');
};

// Handle user registration
exports.registerUser = (req, res) => {
  const { name, email, password, bio, interests, gender, genderPreference } = req.body;
  
  // Check if user already exists
  if (User.getUserByEmail(email)) {
    return res.render('register', {
      error: 'Email already in use',
      name,
      bio,
      interests
    });
  }
  
  // Parse interests into an array
  const interestsArray = interests.split(',').map(item => item.trim());
  
  // Create new user
  const user = new User(null, name, email, password, bio, interestsArray, gender, genderPreference);
  User.addUser(user);
  
  // Set session to keep user logged in
  req.session.userId = user.id;
  
  res.redirect('/date-finder/swipe');
};

// Display login page
exports.getLoginPage = (req, res) => {
  res.render('login');
};

// Handle user login
exports.loginUser = (req, res) => {
  const { email, password } = req.body;
  
  // Find user by email
  const user = User.getUserByEmail(email);
  
  // Check if user exists and password matches
  if (!user || user.password !== password) {
    return res.render('login', {
      error: 'Invalid email or password',
      email
    });
  }
  
  // Set session to keep user logged in
  req.session.userId = user.id;
  
  res.redirect('/date-finder/swipe');
};

// Handle user logout
exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};