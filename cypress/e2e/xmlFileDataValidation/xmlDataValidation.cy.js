import { validateXml } from "../../support/utils/validateXml";

describe("Validate XML File", () => {
  it("should validate a valid XML file", () => {
    // Test for valid XML
    cy.readFile("cypress/fixtures/sample11.xml").then((xmlContent) => {
      const isValid = validateXml(xmlContent);
      expect(isValid).to.be.true; // XML is valid
    });
  });

  it("should invalidate a malformed XML file", () => {
    // Test for malformed XML
    cy.readFile("cypress/fixtures/invalidSample.xml").then((xmlContent) => {
      const isValid = validateXml(xmlContent);
      expect(isValid).to.be.false; // XML is invalid
    });
  });

  it("should validate valid XML with multiple data", () => {
    // Simulating another valid XML file
    cy.readFile("cypress/fixtures/SampleData1.xml").then((xmlContent) => {
      const isValid = validateXml(xmlContent);
      expect(isValid).to.be.true; // Valid XML
    });
  });

  it("should validate XML from a URL", () => {
    // Test for validating XML from a URL
    cy.request("https://www.w3schools.com/xml/note.xml").then((response) => {
      const isValid = validateXml(response.body);
      expect(isValid).to.be.true; // XML from URL is valid
    });
  });

  it("should validate a valid XML file with namespace", () => {
    // Test for valid XML file with namespace
    cy.readFile("cypress/fixtures/xmlWithNameSpace.xml").then((xmlContent) => {
      const isValid = validateXml(xmlContent);
      expect(isValid).to.be.true; // valid XML file with namespace
    });
  });

  it("should validate a valid XML file with Self closing tags", () => {
    // Test for valid XML file with Self closing tags
    cy.readFile("cypress/fixtures/xmlWithSelfClosingTags.xml").then(
      (xmlContent) => {
        const isValid = validateXml(xmlContent);
        expect(isValid).to.be.true; // valid XML file with Self closing tags
      }
    );
  });

  it("should validate a valid XML file with CDATA Section", () => {
    // Test for valid XML file with CDATA Section
    cy.readFile(
      "cypress/fixtures/xmlWithCDATA-Section-Character-Data.xml"
    ).then((xmlContent) => {
      const isValid = validateXml(xmlContent);
      expect(isValid).to.be.true; // valid XML file with CDATA Section
    });
  });

  it("should validate a valid XML file with XHTML Style Document", () => {
    // Test for valid XML file with XHTML Style Document
    cy.readFile("cypress/fixtures/xmlWithXHTML-Style-Document.xml").then(
      (xmlContent) => {
        const isValid = validateXml(xmlContent);
        expect(isValid).to.be.true; // valid XML file with XHTML Style Document
      }
    );
  });

  it("should validate a valid XML file with XML with Comments", () => {
    // Test for valid XML file with XML with Comments
    cy.readFile("cypress/fixtures/xmlWithComments.xml").then((xmlContent) => {
      const isValid = validateXml(xmlContent);
      expect(isValid).to.be.true; // valid XML file with XML with Comments
    });
  });

  it("should validate a valid XML file with RSS Feed Well-Formed XML", () => {
    // Test for valid XML file with RSS Feed Well-Formed XML
    cy.readFile("cypress/fixtures/rssFeedWell-FormedXML.xml").then(
      (xmlContent) => {
        const isValid = validateXml(xmlContent);
        expect(isValid).to.be.true; // valid XML file with RSS Feed Well-Formed XML
      }
    );
  });

  it("should invalidate a Unclosed tag XML file", () => {
    // Test for Unclosed tag XML file
    cy.readFile("cypress/fixtures/xmlWithUnclosedTag.xml").then(
      (xmlContent) => {
        const isValid = validateXml(xmlContent);
        expect(isValid).to.be.false; // XML is invalid (Unclosed tag XML file)
      }
    );
  });

  it("should invalidate a Mismatched tag XML file", () => {
    // Test for Mismatched tag XML file
    cy.readFile("cypress/fixtures/mismatchedTag.xml").then((xmlContent) => {
      const isValid = validateXml(xmlContent);
      expect(isValid).to.be.false; // XML is invalid (Mismatched tag XML file)
    });
  });

  it("should invalidate a Multiple Root Elements XML file", () => {
    // Test for Multiple Root Elements XML file
    cy.readFile("cypress/fixtures/multipleRootElements.xml").then(
      (xmlContent) => {
        const isValid = validateXml(xmlContent);
        expect(isValid).to.be.false; // XML is invalid (Multiple Root Elements XML file)
      }
    );
  });

  it("should invalidate a Missing Quotes Around Attribute Value XML file", () => {
    // Test for Multiple Root Elements XML file
    cy.readFile("cypress/fixtures/missingQuotesAroundAttributeValue.xml").then(
      (xmlContent) => {
        const isValid = validateXml(xmlContent);
        expect(isValid).to.be.false; // XML is invalid (Multiple Root Elements XML file)
      }
    );
  });

  it("should invalidate a Improper Nesting XML file", () => {
    // Test for Improper Nesting XML file
    cy.readFile("cypress/fixtures/missingQuotesAroundAttributeValue.xml").then(
      (xmlContent) => {
        const isValid = validateXml(xmlContent);
        expect(isValid).to.be.false; // XML is invalid (Improper Nesting XML file)
      }
    );
  });

  it("should invalidate a Invalid Characters XML file", () => {
    // Test for Invalid Characters XML file
    cy.readFile("cypress/fixtures/xmlWithInvalidCharacters.xml").then(
      (xmlContent) => {
        const isValid = validateXml(xmlContent);
        expect(isValid).to.be.false; // XML is invalid (Invalid Characters XML file)
      }
    );
  });

  it("should invalidate a Invalid Characters XML file", () => {
    // Test for Invalid Characters XML file
    cy.readFile("cypress/fixtures/xmlWithInvalidCharacters.xml").then(
      (xmlContent) => {
        const isValid = validateXml(xmlContent);
        expect(isValid).to.be.false; // XML is invalid (Invalid Characters XML file)
      }
    );
  });

  it("should invalidate a Empty Element Not Closed XML file", () => {
    // Test for Empty Element Not Closed XML file
    cy.readFile("cypress/fixtures/xmlEmptyElementNotClosed.xml").then(
      (xmlContent) => {
        const isValid = validateXml(xmlContent);
        expect(isValid).to.be.false; // XML is invalid (Empty Element Not Closed XML file)
      }
    );
  });

  it("should invalidate a Comment Not Closed XML file", () => {
    // Test for Comment Not Closed XML file
    cy.readFile("cypress/fixtures/commentNotClosed.xml").then((xmlContent) => {
      const isValid = validateXml(xmlContent);
      expect(isValid).to.be.false; // XML is invalid (Comment Not Closed XML file)
    });
  });

  it("should invalidate a Duplicate Attribute Names XML file", () => {
    // Test for Duplicate Attribute Names XML file
    cy.readFile("cypress/fixtures/duplicateAttributeNames.xml").then(
      (xmlContent) => {
        const isValid = validateXml(xmlContent);
        expect(isValid).to.be.false; // XML is invalid (Duplicate Attribute Names XML file)
      }
    );
  });

  it("should invalidate a Illegal Root Declaration (like JSON) XML file", () => {
    // Test for Illegal Root Declaration (like JSON) XML file
    cy.readFile("cypress/fixtures/illegalRootDeclaration.xml").then(
      (xmlContent) => {
        const isValid = validateXml(xmlContent);
        expect(isValid).to.be.false; // XML is invalid (Illegal Root Declaration (like JSON) XML file)
      }
    );
  });
});

describe("XML Schema Validation", () => {
  it("should validate XML against XSD schema", () => {
    cy.task("validateXml", {
      xmlFile: "formData.xml",
      xsdFile: "schema.xsd",
    }).then((result) => {
      expect(result.valid, JSON.stringify(result.errors || result.error)).to.be
        .true; // the XML is valid
    });
  });

  it("should validate XML against XSD schema", () => {
    cy.task("validateXml", {
      xmlFile: "formData.xml",
      xsdFile: "invalidSchema.xsd",
    }).then((result) => {
      expect(result.valid, JSON.stringify(result.errors || result.error)).to.be
        .false; // the XML is invalid
    });
  });
});
