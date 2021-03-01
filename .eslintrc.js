module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint",
        "prettier"
    ],
    "rules": {
        'indent': [2, 2, {SwitchCase: 1, ignoreComments: false, ImportDeclaration: 1}],
        'semi': 2,
        "@typescript-eslint/no-explicit-any" : "off",
        "@typescript-eslint/explicit-module-boundary-types" : "off",
        "@typescript-eslint/ban-ts-comment" : "off"
    }
};
