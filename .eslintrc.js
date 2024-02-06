module.exports = {
  extends: [require.resolve('alfred-fabric/lib/eslint')],

  globals: {
    REACT_APP_ENV: true,
    ROOT_PATH: true,
  },

  rules: {
    // your rules
    "no-shadow": "off",
    "no-plusplus": "off",
    "no-param-reassign": "off",
    "jsx-a11y/label-has-associated-control": "off",
    "jsx-a11y/no-noninteractive-element-interactions": "off",
    "jsx-a11y/no-autofocus": "off",
    "consistent-return": "off"
  },
};