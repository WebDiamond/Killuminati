export default {
  expo: {
    name: "Killuminati",
    slug: "killuminati-expo",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/backgrounds/killuminatiwr.png",
    userInterfaceStyle: "light",
    splash: {
      backgroundColor: "#479cde"
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      bundleIdentifier: "com.killuminati.expo",
      supportsTablet: true
    },
    android: {
      package: "com.killuminati.expo",
      adaptiveIcon: {
        foregroundImage: "./assets/backgrounds/killuminatiwr.png",
        backgroundColor: "#479cde"
      },
      permissions: ["VIBRATE"]
    },
    plugins: [
      "expo-av"
    ],
    extra: {
      eas: {
        projectId: "your-project-id"
      }
    }
  }
};
