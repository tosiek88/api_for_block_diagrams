module.exports = {
  verbose: true,
  bail: true,
  testRegex: '(e2e-test).(ts)',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
};
