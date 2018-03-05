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
    'vue'
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
    'indent': 'off',
    'vue/script-indent': [
      'error',
      2,
      {'baseIndent': 1}
    ],
    'object-curly-spacing': ['error', 'never'],
    'comma-dangle': ['error', 'never'],
    'arrow-parens': ['error', 'as-needed'],
    'linebreak-style': ['error', 'windows'],
    // TODO remove after fix in TS parser - TypeScript interfaces broken
    'no-undef': 'off'
  }
}
