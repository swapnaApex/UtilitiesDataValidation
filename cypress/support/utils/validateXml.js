// cypress/support/utils/validateXml.js

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
