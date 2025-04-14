const express = require('express');
const router = express.Router();
const dateFinderController = require('../controllers/dateFinderController');

// Create user profile
router.get('/', dateFinderController.getHomePage);
router.post('/create-profile', dateFinderController.createProfile);

// Swipe functionality
router.get('/swipe', dateFinderController.getSwipePage);
router.post('/swipe', dateFinderController.processSwipe);

// Matches
router.get('/matches', dateFinderController.getMatchesPage);

module.exports = router;