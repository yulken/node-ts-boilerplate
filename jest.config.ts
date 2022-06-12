import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';

export default {
  clearMocks: true,
  maxWorkers: 1,
  preset: 'ts-jest',
  testEnvironment: 'node',
  coverageDirectory: 'coverage',
  moduleDirectories: ['node_modules', 'src'],
  injectGlobals: false,
  setupFilesAfterEnv: ['<rootDir>/test/setup/index.ts'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
  coverageReporters: [
    'text-summary',
    'lcov'
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/'
  ]

};