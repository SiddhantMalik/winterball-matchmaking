const User = require('../models/user');

// Display the login/registration page
exports.getHomePage = (req, res) => {
  res.render('index');
};

// Create a new user profile
exports.createProfile = (req, res) => {
  const { name, bio, interests } = req.body;
  
  // Parse interests into an array
  const interestsArray = interests.split(',').map(item => item.trim());
  
  const user = new User(null, name, bio, interestsArray);
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
  const potentialMatches = User.getPotentialMatches(userId);
  
  res.render('swipe', { 
    user: currentUser,
    potentialMatch: potentialMatches[0] || null,
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