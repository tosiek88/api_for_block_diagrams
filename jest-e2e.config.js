module.exports = {
  verbose: true,
  bail: true,
  testRegex: '(e2e-test)',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
};
