const express = require('express');
const router = express.Router();

// Homepage route - does not require authentication
router.get('/', (req, res) => {
  // If user is already logged in, redirect to swipe page
  if (req.session.userId) {
    return res.redirect('/date-finder/swipe');
  }
  
  // Otherwise show the landing page
  res.render('index');
});

module.exports = router;