const users = [];
const likes = new Map(); // Store user likes: userId => [liked user ids]
const matches = new Map(); // Store matches: userId => [matched user ids]

class User {
  constructor(id, name, email, password, bio, interests, photos = []) {
    this.id = id || Date.now().toString();
    this.email = email;
    this.password = password; // In production, this should be hashed
    this.name = name;
    this.bio = bio;
    this.interests = interests;
    this.photos = photos;
  }

  static addUser(user) {
    users.push(user);
    return user;
  }

  static getUserById(id) {
    return users.find(user => user.id === id);
  }
  
  static getUserByEmail(email) {
    return users.find(user => user.email === email);
  }
  
  static getAllUsers() {
    return users;
  }
  
  static addLike(userId, likedUserId) {
    if (!likes.has(userId)) {
      likes.set(userId, []);
    }
    likes.get(userId).push(likedUserId);
    
    // Check if this creates a match
    if (likes.has(likedUserId) && likes.get(likedUserId).includes(userId)) {
      this.createMatch(userId, likedUserId);
    }
    
    return likes.get(userId);
  }
  
  static createMatch(user1Id, user2Id) {
    if (!matches.has(user1Id)) {
      matches.set(user1Id, []);
    }
    if (!matches.has(user2Id)) {
      matches.set(user2Id, []);
    }
    
    matches.get(user1Id).push(user2Id);
    matches.get(user2Id).push(user1Id);
    
    return true;
  }
  
  static getMatches(userId) {
    return matches.has(userId) ? 
      matches.get(userId).map(id => this.getUserById(id)) : 
      [];
  }
  
  static getPotentialMatches(userId) {
    const userLikes = likes.get(userId) || [];
    return users.filter(user => 
      user.id !== userId && !userLikes.includes(user.id)
    );
  }
}

module.exports = User;