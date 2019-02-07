module.exports = {
  clearMocks: true,
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|build)$": "<rootDir>/__mocks__/fileMock.js",
    "\\.(css|less)$": "identity-obj-proxy",
    "vk-apps-frontend(.*)$": "<rootDir>/src/$1",
  },
  setupFiles: [
    "<rootDir>/setupFile.js"
  ],
  testEnvironment: "jsdom",
  transformIgnorePatterns: [
    "/node_modules/(?!@vkontakte/vkui-connect-mock).+\\.js$"
  ]
};