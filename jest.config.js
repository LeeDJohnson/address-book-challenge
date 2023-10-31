module.exports = {
  preset: 'jest-preset-angular',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json'
    }
  },
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1'
  },
  testMatch: [
    "**/?(*.)+(spec|test).[tj]s?(x)",
    "!**/cypres.spec.ts"
  ],
};
