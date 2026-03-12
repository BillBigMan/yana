module.exports = {
  extends: ['next/core-web-vitals'],
  rules: {
    // Ignorer les require dans les scripts de build
    'node/no-unpublished-import': 'off',
    'node/no-unpublished-require': 'off',
    'node/no-missing-import': 'off',
    'node/no-extraneous-import': 'off',
    'node/no-extraneous-require': 'off',
  },
  overrides: [
    {
      files: ['scripts/**/*.js'],
      rules: {
        // Permettre les require dans les scripts
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-require-imports': 'off',
        'node/no-unpublished-import': 'off',
        'node/no-unpublished-require': 'off',
      }
    }
  ]
};
