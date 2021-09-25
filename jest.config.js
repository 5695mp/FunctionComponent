/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/en/configuration.html
 */
// const {defaults: tsjPreset} = require('ts-jest/presets');

// module.exports = {
//   preset: 'react-native',
//   setupFilesAfterEnv: ['<rootDir>/__mocks__/jest.setup.js'],
//   // setupFilesAfterEnv: ['./__mocks__/jest.setup.js'],
//
//   // snapshotSerializers: ['jest-emotion'],
//   collectCoverage: true,
//   unmockedModulePathPatterns: [
//     'react',
//     'react-dom',
//     'react-addons-test-utils',
//     'fbjs',
//     'enzyme',
//     'cheerio',
//     'htmlparser2',
//     'lodash',
//     'domhandler',
//     'object.assign',
//     'define-properties',
//     'function-bind',
//     'object-keys',
//     'object.values',
//     'es-abstract',
//   ],
//   verbose: true,
//   moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
//
//   transformIgnorePatterns: [
//     'node_modules/(react-clone-referenced-element|@react-native-community|react-navigation|@react-navigation/.*|@unimodules/.*|native-base|react-native-code-push)',
//   ],
//
//   moduleNameMapper: {
//     '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$':
//       'jest-transform-stub',
//   },
//   cacheDirectory: '.jest/cache',
//   testEnvironment: 'jsdom',
// };

module.exports = {
  preset: 'react-native',
  setupFiles: ['<rootDir>/__mocks__/jest.setup.js'],
  collectCoverage: true,
  unmockedModulePathPatterns: [
    'react',
    'react-dom',
    'react-addons-test-utils',
    'fbjs',
    'enzyme',
    'cheerio',
    'htmlparser2',
    'lodash',
    'domhandler',
    'object.assign',
    'define-properties',
    'function-bind',
    'object-keys',
    'object.values',
    'es-abstract',
  ],
  verbose: true,
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

  transformIgnorePatterns: [
    'node_modules/(react-clone-referenced-element|@react-native-community|react-navigation|@react-navigation/.*|@unimodules/.*|native-base|react-native-code-push)',
  ],

  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub',
  },
  cacheDirectory: '.jest/cache',
  testEnvironment: 'jsdom',
};
