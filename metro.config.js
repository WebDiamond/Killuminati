// Extend Expo's metro config to avoid "custom metro config" warnings
const { getDefaultConfig } = require('expo/metro-config');

module.exports = getDefaultConfig(__dirname);
