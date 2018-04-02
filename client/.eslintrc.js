// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'typescript-eslint-parser'
  },
  env: {
    browser: true,
  },
  // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
  extends: ['plugin:vue/recommended', 'airbnb-base'],
  // required to lint *.vue files
  plugins: [
    'vue',
    'typescript'
  ],
  // check if imports actually resolve
  settings: {
    'import/resolver': {
      webpack: {
        config: 'build/webpack.base.conf.js'
      }
    }
  },
  // add your custom rules here
  rules: {
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      js: 'never',
      ts: 'never',
      //vue: 'never'
    }],
    // disallow reassignment of function parameters
    // disallow parameter object manipulation except for specific exclusions
    'no-param-reassign': 'off',
    // TODO investigate a.b = !a.b assignments
    // 'no-param-reassign': ['error', {
    //   props: true,
    //   ignorePropertyModificationsFor: [
    //     'state', // for vuex state
    //     'acc', // for reduce accumulators
    //     'e' // for e.returnvalue
    //   ]
    // }],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': ['error', {
      optionalDependencies: ['test/unit/index.js']
    }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'indent': ['error', 2],
    'object-curly-spacing': ['error', 'never'],
    'comma-dangle': ['error', 'never'],
    'arrow-parens': ['error', 'as-needed'],
    'max-len': ['error', { "code": 120 }],
    // Broken
    'space-infix-ops': 'off',
    // TypeScript checks this via compiler options - see tsconfig
    'no-undef': 'off',
    'no-unused-vars': 'off',
    // TODO fix after parser fixed https://github.com/eslint/typescript-eslint-parser#known-issues
    'import/prefer-default-export': 'off',
    // TODO enable later if really needed
    'vue/require-v-for-key': 'off',

    // Typescript Plugin
    'typescript/adjacent-overload-signatures': ['error'],
    'typescript/class-name-casing': ['error'],
    'typescript/interface-name-prefix': ['error', 'always'],
    'typescript/member-ordering': ['error'],
    'typescript/no-angle-bracket-type-assertion': ['error'],
    'typescript/no-array-constructor': ['error'],
    'typescript/no-empty-interface': ['error'],
    'typescript/no-explicit-any': ['error'],
    'typescript/no-namespace': ['error'],
    'typescript/no-triple-slash-reference': ['error'],
    'typescript/type-annotation-spacing': ['error'],
  },
  overrides: [
    {
      files: ["*.vue"],
      rules: {
        'indent': 'off',
        'vue/script-indent': [
          'error',
          2,
          {'baseIndent': 1}
        ],
      }
    }
  ]
}
