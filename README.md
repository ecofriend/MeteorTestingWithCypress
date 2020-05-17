
# Testing Meteor Vue apps with Cypress
Demo app for using [Cypress](https://www.cypress.io/) to test  [Vue](https://vuejs.org/) based [Meteor](https://www.meteor.com/) apps.

I’m just learning JavaScript, Meteor, Vue and Cypress and struggled to create unit testing Meteor apps using Cypress. After spending more days than I wanted, I finally got it working and thought I’d share my findings.

## To run the demo app.

Clone repo.

In a terminal

> meteor npm install  
> meteor

In another terminal

> meteor npm run cy-gui

## To add Cypress testing (including unit testing) to your own Meteor app.
I'll go through the whole steps of creating a Vue-based Meteor app from scratch.

> meteor create MyVueApp
> meteor npm install --save vue
> meteor add akryum:vue-component static-html
> meteor remove blaze-html-templates
> meteor npm install cypress --save-dev

I believe you could do just "npm install... " but just in case you don't have npm installed globally.
Next, edit your package.json file

    "scripts": {
      ...,
      "cy-gui": "cypress open",
      "cy-headless": "cypress run"
    },

> meteor npm run cy-gui

This will create a cypress folder as well as a cypress.json file.
> mv cypress/ tests/cypress

Edit your cypress.json file.

    {
      "componentFolder": "tests/cypress/component",
      "fixturesFolder": "tests/cypress/fixtures",
      "integrationFolder": "tests/cypress/integration",
      "pluginsFile": "tests/cypress/plugins/index.js",
      "screenshotsFolder": "tests/cypress/screenshots",
      "supportFile": "tests/cypress/support/index.js",
      "videosFolder": "tests/cypress/videos",
      "experimentalComponentTesting": true
    }

Create your e2e test (.js) in the the tests/cypress/integration folder.
It should show up in the Cypress GUI. Make sure your meteor app is already running.
To add unit testing, in a new terminal window:
> meteor npm install cypress-vue-unit-test @cypress/webpack-preprocessor @babel/core @babel/preset-env babel-loader webpack vue-loader vue-template-compiler css-loader chai --save-dev

Edit index.js located in \tests\cypress\plugins\

    const VueLoaderPlugin = require("vue-loader/lib/plugin");
    const webpack = require("@cypress/webpack-preprocessor");
    const webpackOptions = {
      module: {
        rules: [
          {
            test: /\.vue$/,
            loader: "vue-loader",
          },
          {
            test: /\.js$/,
            loader: "babel-loader",
          },
          {
            test: /\.css$/,
            //use: ["style-loader", "css-loader"],
            use: "css-loader",
          },
        ],
      },
      resolve: {
        extensions: [".js", ".vue"],
        alias: {
          vue$: "vue/dist/vue.esm.js",
        },
      },
      plugins: [new VueLoaderPlugin()],
    };
    
    const options = {
      // send in the options from your webpack.config.js, so it works the same
      // as your app's code
      webpackOptions,
      watchOptions: {},
    };
    
    module.exports = (on) => {
      on("file:preprocessor", webpack(options));
    };
Create your unit test (.js) in the tests\cypress\component folder. It should appear in your Cypress GUI and now you are all set for e2e and unit testing Vue-based Meteor apps using Cypress.

If I missed something important please let me know.

## Resources
Helpful links that I used to figure this out.

- https://dev.to/splitified/test-your-meteor-app-with-docker-jenkins-and-cypress-part-1-12om
- https://github.com/bahmutov/cypress-vue-unit-test
- https://github.com/cypress-io/cypress-webpack-preprocessor
- https://learntdd.in/vue/
- http://kakts-tec.hatenablog.com/entry/2018/10/05/012645
- https://qiita.com/7110/items/0721525ed6ccc263768b
