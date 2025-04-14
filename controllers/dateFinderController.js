const User = require('../models/user');

// Display the login/registration page
exports.getHomePage = (req, res) => {
  res.render('index');
};

// Create a new user profile
exports.createProfile = (req, res) => {
  const { name, email, password, bio, interests, gender, genderPreference } = req.body;
  
  // Parse interests into an array
  const interestsArray = interests.split(',').map(item => item.trim());
  
  const user = new User(null, name, email, password, bio, interestsArray, gender, genderPreference);
  User.addUser(user);
  
  // Set session to keep user logged in
  req.session.userId = user.id;
  
  res.redirect('/date-finder/swipe');
};

// Display potential matches to swipe on
exports.getSwipePage = (req, res) => {
  const userId = req.session.userId;
  
  if (!userId) {
    return res.redirect('/');
  }
  
  const currentUser = User.getUserById(userId);
  if (!currentUser) {
    req.session.destroy();
    return res.redirect('/');
  }
  
  const potentialMatches = User.getPotentialMatches(userId) || [];
  
  res.render('swipe', { 
    user: currentUser,
    potentialMatch: potentialMatches.length > 0 ? potentialMatches[0] : null,
    remainingMatches: potentialMatches.length
  });
};

// Process a like/swipe
exports.processSwipe = (req, res) => {
  const userId = req.session.userId;
  const { targetId, action } = req.body;
  
  if (!userId) {
    return res.redirect('/');
  }
  
  if (action === 'like') {
    User.addLike(userId, targetId);
  }
  
  res.redirect('/date-finder/swipe');
};

// Show all matches
exports.getMatchesPage = (req, res) => {
  const userId = req.session.userId;
  
  if (!userId) {
    return res.redirect('/');
  }
  
  const matches = User.getMatches(userId);
  
  res.render('matches', { 
    matches,
    user: User.getUserById(userId)
  });
};

// Display edit profile page
exports.getEditProfilePage = (req, res) => {
  const userId = req.session.userId;
  
  if (!userId) {
    return res.redirect('/');
  }
  
  const user = User.getUserById(userId);
  
  res.render('editProfile', { user });
};

// Update user profile
exports.updateProfile = (req, res) => {
  const userId = req.session.userId;
  
  if (!userId) {
    return res.redirect('/');
  }
  
  const { name, bio, interests, gender, genderPreference } = req.body;
  const interestsArray = interests.split(',').map(item => item.trim());
  
  User.updateUser(userId, {
    name,
    bio,
    interests: interestsArray,
    gender,
    genderPreference
  });
  
  res.redirect('/date-finder/matches');
};