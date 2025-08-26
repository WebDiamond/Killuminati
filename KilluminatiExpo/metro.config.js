const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Configurazione per gestire meglio gli asset
config.resolver.assetExts.push('png', 'jpg', 'jpeg', 'gif', 'mp3', 'wav');

// Configurazione per risolvere problemi di moduli
config.resolver.platforms = ['ios', 'android', 'native', 'web'];

// Configurazione per risolvere problemi di runtime
config.resolver.unstable_enableSymlinks = false;

module.exports = config;
