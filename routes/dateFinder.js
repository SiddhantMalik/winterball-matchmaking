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

// Profile editing
router.get('/edit-profile', dateFinderController.getEditProfilePage);
router.post('/edit-profile', dateFinderController.updateProfile);

module.exports = router;