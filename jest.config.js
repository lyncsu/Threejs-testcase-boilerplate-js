module.exports = {
  rootDir: './',
  testRegex: '(src/testcase/jest/.*\\.(spec))\\.js?$',
  moduleFileExtensions: ['js'],
  collectCoverageFrom: ['**/testcase/jest/', '!**/node_modules/**', '!**/vendor/**'],
}
