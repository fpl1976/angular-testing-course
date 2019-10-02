module.exports = {
  preset: 'jest-preset-angular',
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/src/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.html$',
      astTransformers: ['jest-preset-angular/InlineHtmlStripStylesTransformer'],
      diagnostics: {
        ignoreCodes: [151001]
      },
      isolatedModules: true
    }
  },
  roots: ['src'],
  setupFilesAfterEnv: ["./src/setup-jest.ts"],
  transformIgnorePatterns: [
    "node_modules/(?!@ngrx|angular2-ui-switch|ng-dynamic)"
  ],
  restoreMocks: true,
  reporters: [
    'default',
    'jest-junit'
  ],
  coverageReporters: [
    "html",
    "cobertura"
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/src/environments/'
  ],
  moduleDirectories: [
    ".",
    "src",
    "node_modules"
  ]
};
