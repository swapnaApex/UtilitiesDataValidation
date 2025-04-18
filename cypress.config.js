const { defineConfig } = require("cypress");
const fs = require("fs");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on("task", {
        saveXmlToFixture({ fileName, data }) {
          fs.writeFileSync(`cypress/fixtures/${fileName}`, data);
          return null;
        },
      });
    },
  },
});
