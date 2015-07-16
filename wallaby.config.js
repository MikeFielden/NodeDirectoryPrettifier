module.exports = function () {
  return {
    "files": [
      "index.js",
      "node_modules/*"
    ],

    "tests": [
      "test/indexSpec.js",
      "test/**/*Spec.js"
    ],

    "testFramework": "mocha",

    "env": {
      "type": "node",
      "runner": "/Users/ColdToast/.nvm/versions/io.js/v2.2.1/bin/iojs"
    }
  };
};