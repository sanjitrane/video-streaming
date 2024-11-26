
module.exports={
  collectCoverage: true,
  collectCoverageFrom:['src/**/*.{ts,tsx}'],
  coverageDirectory:'coverage',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./jest.setup.js'],
  coverageThreshold:{
    "global":{
      "branches": 40,
      "functions": 40,
      "lines": 40,
      "statements": -10
    }
  }
}