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

export function saveXmlFromApi(url, fileName) {
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
