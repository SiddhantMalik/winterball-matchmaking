# Winterball Matchmaking

A web application helps to find compatible dates for the Winterball event. Users can create profiles, express their preferences, and use a swipe-based system to find potential matches.

## Features

- **User Authentication**: Register, login, and logout function
- **Profile Creation**: Set up your profile with personal details and interests
- **Dating Preferences**: Specify gender preferences for matching
- **Swipe Interface**: Find matches using a swipe right/left interface
- **Match Management**: View and contact your matches
- **Profile Editing**: Update your information anytime

## Tech Stack

- **Backend**: Node.js with Express
- **Frontend**: EJS templates with CSS styling
- **Session Management**: express-session
- **Data Storage**: In-memory storage using arrays

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/SiddhantMalik/winterball-matchmaking.git
   cd winterball-matchmaking
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the application:
   ```
   node app.js
   ```

4. Access the application at `http://localhost:3000`

## Usage

### Creating an Account

1. Visit the homepage and click "Create Account"
2. Fill in your details, including:
   - Personal information
   - Bio
   - Interests (comma-separated)
   - Gender identity
   - Gender preference for matches

### Finding Matches

1. Navigate to the Swipe page
2. View the potential matches one at a time based on your gender preferences
3. Click "Like" or "Pass" to indicate interest
4. When two users like each other, a match is created

### Managing Matches

1. View your matches on the Matches page
2. Contact matches via the provided email button
3. Edit your profile anytime to reflect your true preferences

## Project Structure

```
winterball-matchmaking/
├── app.js                # Main application entry point
├── controllers/          # Business logic controllers
│   ├── authController.js # Authentication logic
│   └── dateFinderController.js # Matchmaking logic
├── middleware/           # Express middleware
├── models/               # Data models
├── public/               # Static assets
│   ├── css/              # Stylesheets
│   └── js/               # Client-side scripts
├── routes/               # API routes
├── views/                # EJS templates
└── vercel.json           # Deployment configuration 
```

