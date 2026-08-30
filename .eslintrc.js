module.exports = {
  extends: ['airbnb', 'airbnb/hooks', 'next/core-web-vitals', 'plugin:react/recommended', 'eslint-config-prettier', 'plugin:jsx-a11y/recommended', 'plugin:@react-three/recommended'],
  plugins: ['eslint-plugin-prettier', 'react', 'jsx-a11y', '@react-three'],
  rules: {
    'react/prop-types': 'off',
    // 'import-helpers/order-imports': [
    //   'warn',
    //   {
    //     newlinesBetween: 'always',
    //     alphabetize: { order: 'asc', ignoreCase: true },
    //     groups: [
    //       // Packages `react` related packages come first.
    //       ['/^react/'],
    //       ['/^next/', '/^store/'],
    //       ['/^hooks/', '/^helpers/'],
    //       ['/^@mui/', '/^components/'],
    //       '/^pages/',
    //     ],
    //   },
    // ],
    'object-curly-newline': 'off',
    'react/no-unknown-property': 'off',
    'react/display-name': 'off',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
        printWidth: 200,
      },
    ],
    'no-param-reassign': 'off',
    // A temporary hack related to IDE not resolving correct package.json
    'import/no-extraneous-dependencies': 'off',
    'import/no-unresolved': 'error',
    // Since React 17 and typescript 4.1 you can safely disable the rule
    'react/react-in-jsx-scope': 'off',
  },

  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    createDefaultProgram: true,
  },
  settings: {
    // eslint-plugin-import's resolver predates ESM `exports` maps and throws on
    // packages that expose only an "import" condition, as @samasante/liquid-glass
    // does. Treating it as an external module skips resolution without disabling
    // import/no-unresolved for everything else.
    'import/core-modules': ['@samasante/liquid-glass'],
    'import/resolver': {
      alias: {
        map: [['@src', './src']],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
