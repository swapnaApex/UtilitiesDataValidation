const { defineConfig } = require("cypress");
const fs = require("fs"); // Node.js module for file system operations (reading/writing files).
const path = require("path"); //  Node.js module for working with file paths in a cross-platform way.
const libxmljs = require("libxmljs"); // Library to parse and validate XML against XSD.

module.exports = defineConfig({
  // This exports the Cypress config.
  e2e: {
    setupNodeEvents(on, config) {
      // The setupNodeEvents function is used to define custom Node.js-level Cypress tasks.
      on("task", {
        // saveXmlToFixture – saves XML data to a file in the fixtures folder.
        // Takes a fileName and data (raw XML).
        // Writes the XML data into the Cypress fixtures folder using fs.writeFileSync.
        // Returns null since Cypress tasks must return something (or null) synchronously unless it's a Promise.
        saveXmlToFixture({ fileName, data }) {
          fs.writeFileSync(`cypress/fixtures/${fileName}`, data);
          return null;
        },
        // validateXml – loads an XML and XSD file, parses them, and validates the XML against the schema.
        validateXml({ xmlFile, xsdFile }) {
          const xmlPath = path.join(__dirname, "cypress", "fixtures", xmlFile); // Constructs absolute paths to the XML and XSD files using path.join() based on their filenames.
          const xsdPath = path.join(__dirname, "cypress", "fixtures", xsdFile);

          const xmlData = fs.readFileSync(xmlPath, "utf8"); // Reads XML and XSD files from disk as strings.
          const xsdData = fs.readFileSync(xsdPath, "utf8");

          try {
            const xmlDoc = libxmljs.parseXml(xmlData); // Parses both files into XML document objects using libxmljs.
            const xsdDoc = libxmljs.parseXml(xsdData);

            const isValid = xmlDoc.validate(xsdDoc); // Validates the XML file against the XSD schema using libxmljs.
            return {
              // If valid, returns an object with valid: true and no errors (or an empty array).
              valid: isValid,
              errors: xmlDoc.validationErrors,
            };
          } catch (err) {
            // If something fails (bad file format, etc.), it catches the error and returns a meaningful message.
            return {
              valid: false,
              error: err.message,
            };
          }
        },
      });
    },
    reporter: "mochawesome",
    reporterOptions: {
      reportDir: "cypress/reports",
      overwrite: false,
      html: true,
      json: true,
    },
  },
});
