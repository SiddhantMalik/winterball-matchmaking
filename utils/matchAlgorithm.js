function standardizePreferences(preferences) {
    const standardized = {};
    for (const key in preferences) {
        const lowerKey = key.toLowerCase().trim();
        standardized[lowerKey] = preferences[key];
    }
    return standardized;
}

function calculateMatchScore(user1, user2) {
    const preferences1 = user1.preferences;
    const preferences2 = user2.preferences;

    console.log('Preferences1:', preferences1);
    console.log('Preferences2:', preferences2);

    let score = 0;
    let totalWeight = 0;

    for (const key in preferences1) {
        if (preferences2[key] !== undefined) {
            console.log(`Matching key: ${key}, User1: ${preferences1[key]}, User2: ${preferences2[key]}`);
            // Weighted score: preference value * weight
            score += Math.min(preferences1[key], preferences2[key]);
            totalWeight += Math.max(preferences1[key], preferences2[key]);
        }
    }

    console.log('Score:', score, 'Total Weight:', totalWeight);

    // Return a percentage match or 0 if no preferences overlap
    return totalWeight > 0 ? (score / totalWeight) * 100 : 0;
}

module.exports = calculateMatchScore;