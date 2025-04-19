import { validateXml } from "../../support/utils/validateXml";

describe("Validate Multiple XML File", () => {
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
            const isValid = validateXml(xmlContent);
            expect(isValid, `${filePath} should be valid`).to.be.true; // Valid XML files
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
            const isValid = validateXml(xmlContent);
            expect(isValid, `${filePath} should be valid`).to.be.false; // Invalid XML files
          })
        )
      );
    });
  });
});

describe("Multiple XML Files Schema Validation", () => {
  const testCases = [
    { xmlFile: "formData.xml", xsdFile: "schema.xsd" },
    { xmlFile: "formData2.xml", xsdFile: "schema.xsd" },
  ];
  testCases.forEach(({ xmlFile, xsdFile }) => {
    it(`validates ${xmlFile} against ${xsdFile}`, () => {
      cy.task("validateXml", { xmlFile, xsdFile }).then((result) => {
        expect(result.valid, JSON.stringify(result.errors || result.error)).to
          .be.true; // valid XML files
      });
    });
  });
});

describe("Multiple Invalid XML Files Schema Validation", () => {
  const testCases = [
    { xmlFile: "formData.xml", xsdFile: "invalidSchema.xsd" },
    { xmlFile: "formData2.xml", xsdFile: "invalidSchema2.xsd" },
  ];
  testCases.forEach(({ xmlFile, xsdFile }) => {
    it(`validates ${xmlFile} against ${xsdFile}`, () => {
      cy.task("validateXml", { xmlFile, xsdFile }).then((result) => {
        expect(result.valid, JSON.stringify(result.errors || result.error)).to
          .be.false; // Invalid XML files
      });
    });
  });
});
