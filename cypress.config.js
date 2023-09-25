const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    experimentalStudio: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl : 'https://master.chargeautomation.com/',
    "chromeWebSecurity": false,
    "pageLoadTimeout": 200000,
    "defaultCommandTimeout": 200000,
  },
});
