module.exports = function (api) {
  api.cache(true);
  return {
    presets: [["babel-preset-expo", { jsxImportSource: "nativewind" }]],
    plugins: [
      "react-native-reanimated/plugin", // Reanimated 플러그인
      "expo-router/babel",            // Expo Router 플러그인
    ],
  };
};