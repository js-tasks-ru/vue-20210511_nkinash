const config = {
  preset: '@vue/cli-plugin-unit-jest',
  modulePaths: ['utility_modules'],
  testMatch: ['**/__tests__/**/*.(spec|test|student-test).[jt]s?(x)'],
  moduleNameMapper: {
    // Crutch: Use commonjs version of lodash in tests
    '^lodash-es$': '<rootDir>/node_modules/lodash/index.js',
  },
};

if (process.env.TASK_MONITOR) {
  Object.assign(config, {
    testResultsProcessor: './utility_modules/taskbook-test-results-processor.js',
    reporters: [],
  });
}

module.exports = config;
