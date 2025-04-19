const { defineConfig } = require("cypress");
const fs = require("fs");
const path = require("path");
const libxmljs = require("libxmljs");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on("task", {
        saveXmlToFixture({ fileName, data }) {
          fs.writeFileSync(`cypress/fixtures/${fileName}`, data);
          return null;
        },
        validateXml({ xmlFile, xsdFile }) {
          const xmlPath = path.join(__dirname, "cypress", "fixtures", xmlFile);
          const xsdPath = path.join(__dirname, "cypress", "fixtures", xsdFile);

          const xmlData = fs.readFileSync(xmlPath, "utf8");
          const xsdData = fs.readFileSync(xsdPath, "utf8");

          try {
            const xmlDoc = libxmljs.parseXml(xmlData);
            const xsdDoc = libxmljs.parseXml(xsdData);

            const isValid = xmlDoc.validate(xsdDoc);
            return {
              valid: isValid,
              errors: xmlDoc.validationErrors,
            };
          } catch (err) {
            return {
              valid: false,
              error: err.message,
            };
          }
        },
      });
    },
  },
});
