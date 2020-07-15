module.exports = (api, options) => {
  // package.json
  api.extendPackage({
    scripts: {
      serve: "vue-cli-service serve",
      build: "vue-cli-service build",
      lint: "vue-cli-service lint"
    },
    dependencies: {
      "core-js": "^3.6.5",
      "vue": "^2.6.11",
      "vue-router": "^3.3.4",
      "vuex": "^3.4.0",
      "axios":"^0.19.2",
      "element-ui":'^2.13.2',
      "vee-validate":"^3.3.5",
      "vue-awesome":"^4.0.2",
      "vue-loading-overlay":"^3.3.2",
      "vue-moment": "^4.1.0",
      "webpack-theme-color-replacer": "^1.2.17"
    },
    devDependencies: {
      "@vue/cli-plugin-babel": "^4.0.0",
      "@vue/cli-plugin-eslint": "^4.0.0",
      "@vue/cli-plugin-router": "^4.0.0",
      "@vue/cli-plugin-vuex": "^4.0.0",
      "@vue/cli-service": "~4.4.0",
      "@vue/eslint-config-airbnb": "^5.1.0",
      "babel-eslint": "^10.1.0",
      "eslint": "^5.16.0",
      "eslint-plugin-vue": "^5.0.0",
      "lint-staged": "^10.2.11",
      "node-sass": "^4.14.1",
      "sass-loader": "^8.0.2",
      "vue-template-compiler": "^2.6.11"
    },
    gitHooks: {
      "pre-commit": "lint-staged"
    },
    "lint-staged": {
      "*.{js,vue}": ["vue-cli-service lint", "git add"]
    }
  });
  // files
  api.render("./template");
};
