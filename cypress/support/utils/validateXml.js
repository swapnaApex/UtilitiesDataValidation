// cypress/support/utils/validateXml.js
import { XMLValidator } from "fast-xml-parser";

// Function to validate XML string by parsing it
export function validateXml(xmlString) {
  try {
    // Parse the XML string into a DOM object
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, "application/xml");

    // Check if the parser generated any errors
    if (xmlDoc.getElementsByTagName("parsererror").length > 0) {
      return false; // Invalid XML
    }

    return true; // Valid XML
  } catch (e) {
    // Catch any parsing errors
    return false; // Invalid XML
  }
}

// url: the endpoint to fetch the XML from (via cy.request).
// fileName: the name under which to save the fetched XML in the cypress/fixtures folder.
export function saveXmlFromApi(url, fileName) {
  /* cy.request() is used in Cypress to perform backend calls without triggering browser navigation.
   Sends a GET request to the provided url.
   Sets the request header Accept: application/xml to tell the server we expect XML data in response.
   Once the response is received:
   cy.task("saveXmlToFixture", {...}) is used to invoke a Node-level Cypress task (defined in cypress.config.js).
   It passes the filename and the raw XML response (response.body) to be saved.
   The task writes the XML string to a file in the cypress/fixtures/ folder, using fs.writeFileSync. */
  cy.request({
    method: "GET",
    url: url,
    headers: {
      Accept: "application/xml",
    },
  }).then((response) => {
    cy.task("saveXmlToFixture", {
      fileName: fileName,
      data: response.body,
    });
  });
}

/*
This function takes an XML string as input, validates whether it's well-formed using the fast-xml-parser package, and logs the result to Cypress using cy.log. It's designed to be used inside Cypress tests.
This exports the function so it can be imported and used in Cypress test files.
It accepts one argument: xml, which should be a string containing XML data.
Begins a try block to catch any unexpected errors (e.g., bad input or parsing failure).
Ensures the input is a string.
If not, it throws an error to be caught below.
Calls XMLValidator.validate() from fast-xml-parser.
Returns true if XML is valid, or an error object ({ err: { msg, line, col } }) if invalid.
The option { allowBooleanAttributes: true } allows attributes like disabled without ="true".
If XML is valid, it logs a success message using cy.log() and returns true.
If XML is not valid, it logs the error message, line, and column where the parsing failed.
Returns false.
Catches unexpected errors, like null input or internal failures.
Logs a generic exception message and returns false.
*/
export function isWellFormedWithFastParser(xml) {
  try {
    if (typeof xml !== "string") {
      throw new Error("Input is not a valid XML string.");
    }

    const result = XMLValidator.validate(xml, { allowBooleanAttributes: true });

    if (result === true) {
      cy.log(" XML is well-formed.");
      return true;
    } else {
      cy.log(
        ` XML Error: ${result.err.msg} at line ${result.err.line}, column ${result.err.col}`
      );
      return false;
    }
  } catch (e) {
    cy.log(` Exception while validating XML: ${e.message}`);
    return false;
  }
}
