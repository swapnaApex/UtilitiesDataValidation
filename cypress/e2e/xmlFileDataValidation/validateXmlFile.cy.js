import {
  isWellFormedWithFastParser,
  validateXml,
} from "../../support/utils/validateXml";
import { XMLValidator } from "fast-xml-parser";

describe("Validate XML File", () => {
  it("should validate a valid XML file", () => {
    // Test for valid XML
    cy.readFile("cypress/fixtures/sample11.xml").then((xmlContent) => {
      isWellFormedWithFastParser(xmlContent);
    });
  });

  it("should invalidate a malformed XML file", () => {
    // Test for malformed XML
    cy.readFile("cypress/fixtures/invalidSample.xml").then((xmlContent) => {
      isWellFormedWithFastParser(xmlContent);
    });
  });
  it("should validate valid XML with multiple data", () => {
    // Simulating another valid XML file
    cy.readFile("cypress/fixtures/SampleData1.xml").then((xmlContent) => {
      isWellFormedWithFastParser(xmlContent);
    });
  });

  it("should validate XML from a URL", () => {
    // Test for validating XML from a URL
    cy.request("https://www.w3schools.com/xml/note.xml").then((response) => {
      isWellFormedWithFastParser(response.body);
    });
  });

  it("should validate a valid XML file with namespace", () => {
    // Test for valid XML file with namespace
    cy.readFile("cypress/fixtures/xmlWithNameSpace.xml").then((xmlContent) => {
      isWellFormedWithFastParser(xmlContent);
    });
  });

  it("should validate a valid XML file with Self closing tags", () => {
    // Test for valid XML file with Self closing tags
    cy.readFile("cypress/fixtures/xmlWithSelfClosingTags.xml").then(
      (xmlContent) => {
        isWellFormedWithFastParser(xmlContent);
      }
    );
  });

  it("should validate a valid XML file with CDATA Section", () => {
    // Test for valid XML file with CDATA Section
    cy.readFile(
      "cypress/fixtures/xmlWithCDATA-Section-Character-Data.xml"
    ).then((xmlContent) => {
      isWellFormedWithFastParser(xmlContent);
    });
  });

  it("should validate a valid XML file with XHTML Style Document", () => {
    // Test for valid XML file with XHTML Style Document
    cy.readFile("cypress/fixtures/xmlWithXHTML-Style-Document.xml").then(
      (xmlContent) => {
        isWellFormedWithFastParser(xmlContent);
      }
    );
  });

  it("should validate a valid XML file with XML with Comments", () => {
    // Test for valid XML file with XML with Comments
    cy.readFile("cypress/fixtures/xmlWithComments.xml").then((xmlContent) => {
      isWellFormedWithFastParser(xmlContent);
    });
  });

  it("should validate a valid XML file with RSS Feed Well-Formed XML", () => {
    // Test for valid XML file with RSS Feed Well-Formed XML
    cy.readFile("cypress/fixtures/rssFeedWell-FormedXML.xml").then(
      (xmlContent) => {
        isWellFormedWithFastParser(xmlContent);
      }
    );
  });

  it("should invalidate a Unclosed tag XML file", () => {
    // Test for Unclosed tag XML file
    cy.readFile("cypress/fixtures/xmlWithUnclosedTag.xml").then(
      (xmlContent) => {
        isWellFormedWithFastParser(xmlContent);
      }
    );
  });

  it("should invalidate a Mismatched tag XML file", () => {
    // Test for Mismatched tag XML file
    cy.readFile("cypress/fixtures/mismatchedTag.xml").then((xmlContent) => {
      isWellFormedWithFastParser(xmlContent);
    });
  });

  it("should invalidate a Multiple Root Elements XML file", () => {
    // Test for Multiple Root Elements XML file
    cy.readFile("cypress/fixtures/multipleRootElements.xml").then(
      (xmlContent) => {
        isWellFormedWithFastParser(xmlContent);
      }
    );
  });

  it("should invalidate a Missing Quotes Around Attribute Value XML file", () => {
    // Test for Multiple Root Elements XML file
    cy.readFile("cypress/fixtures/missingQuotesAroundAttributeValue.xml").then(
      (xmlContent) => {
        isWellFormedWithFastParser(xmlContent);
      }
    );
  });

  it("should invalidate a Improper Nesting XML file", () => {
    // Test for Improper Nesting XML file
    cy.readFile("cypress/fixtures/xmlWithImproperNesting.xml").then(
      (xmlContent) => {
        isWellFormedWithFastParser(xmlContent);
      }
    );
  });

  it("should invalidate a Invalid Characters XML file", () => {
    // Test for Invalid Characters XML file
    cy.readFile("cypress/fixtures/xmlWithInvalidCharacters.xml").then(
      (xmlContent) => {
        isWellFormedWithFastParser(xmlContent);
      }
    );
  });

  it("should invalidate a Empty Element Not Closed XML file", () => {
    // Test for Empty Element Not Closed XML file
    cy.readFile("cypress/fixtures/xmlEmptyElementNotClosed.xml").then(
      (xmlContent) => {
        isWellFormedWithFastParser(xmlContent);
      }
    );
  });

  it("should invalidate a Comment Not Closed XML file", () => {
    // Test for Comment Not Closed XML file
    cy.readFile("cypress/fixtures/commentNotClosed.xml").then((xmlContent) => {
      isWellFormedWithFastParser(xmlContent);
    });
  });

  it("should invalidate a Duplicate Attribute Names XML file", () => {
    // Test for Duplicate Attribute Names XML file
    cy.readFile("cypress/fixtures/duplicateAttributeNames.xml").then(
      (xmlContent) => {
        isWellFormedWithFastParser(xmlContent);
      }
    );
  });

  it("should invalidate a Illegal Root Declaration (like JSON) XML file", () => {
    // Test for Illegal Root Declaration (like JSON) XML file
    cy.readFile("cypress/fixtures/illegalRootDeclaration.xml").then(
      (xmlContent) => {
        isWellFormedWithFastParser(xmlContent);
      }
    );
  });

  it("should validate Multiple valid XML files ", () => {
    const testFiles = [
      "cypress/fixtures/xmlWithNameSpace.xml",
      "cypress/fixtures/xmlWithSelfClosingTags.xml",
      "cypress/fixtures/xmlWithCDATA-Section-Character-Data.xml",
    ];

    cy.wrap(null).then(() => {
      return Promise.all(
        testFiles.map((filePath) =>
          cy.readFile(filePath).then((xmlContent) => {
            isWellFormedWithFastParser(xmlContent);
          })
        )
      );
    });
  });

  it("should validate Multiple Invalid XML files ", () => {
    const testFiles = [
      "cypress/fixtures/missingQuotesAroundAttributeValue.xml",
      "cypress/fixtures/mismatchedTag.xml",
      "cypress/fixtures/xmlEmptyElementNotClosed.xml",
    ];

    cy.wrap(null).then(() => {
      return Promise.all(
        testFiles.map((filePath) =>
          cy.readFile(filePath).then((xmlContent) => {
            isWellFormedWithFastParser(xmlContent);
          })
        )
      );
    });
  });

  it("should validate Multiple & Invalid XML files ", () => {
    const testFiles = [
      "cypress/fixtures/xmlWithNameSpace.xml",
      "cypress/fixtures/mismatchedTag.xml",
      "cypress/fixtures/xmlEmptyElementNotClosed.xml",
    ];

    cy.wrap(null).then(() => {
      return Promise.all(
        testFiles.map((filePath) =>
          cy.readFile(filePath).then((xmlContent) => {
            isWellFormedWithFastParser(xmlContent);
          })
        )
      );
    });
  });
});
