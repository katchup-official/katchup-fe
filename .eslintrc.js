module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    '@react-native',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  plugins: ['@typescript-eslint'],
  rules: {
    // 필요 시 커스텀 규칙 추가
    '@typescript-eslint/no-unused-vars': ['warn'],
  },
};