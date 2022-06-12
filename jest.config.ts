export default {
  clearMocks: true,
  maxWorkers: 1,
  preset: 'ts-jest',
  testEnvironment: 'node',
  coverageDirectory: 'coverage',
  moduleDirectories: ['node_modules', 'src'],
  coverageReporters: [
    'text-summary',
    'lcov'
  ],
  collectCoverageFrom: [
    //
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/'
  ]

};