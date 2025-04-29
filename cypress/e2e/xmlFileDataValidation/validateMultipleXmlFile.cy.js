import { validateXml } from "../../support/utils/validateXml";

describe("Validate Multiple XML File", () => {
  /*
    A single test case checking if multiple XML files are valid.
    testFiles is an array of paths pointing to different XML files stored in cypress/fixtures/.
    cy.wrap(null) is used to start a Cypress promise chain.
    Inside .then(), you're using Promise.all() to run all file validations in parallel.
    For each file:
    Cypress reads it using cy.readFile(filePath).
    The content is passed to validateXml(xmlContent) (a function you must have defined somewhere—likely a helper or plugin).
    */
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

/*
This test suite validates multiple XML files (formData.xml, formData2.xml) against the same XSD schema (schema.xsd) to ensure they conform to the expected XML structure defined by the schema.
testCases is an array of objects.
Each object defines:
xmlFile: the XML file to be validated.
xsdFile: the XSD file it should conform to.
Both XMLs are tested against the same schema (schema.xsd).
This loop iterates through each test case in the testCases array.
A dynamic test case is created for each file, e.g.:
validates formData.xml against schema.xsd
validates formData2.xml against schema.xsd
Calls a Cypress Node task named validateXml, passing the filenames.
This task will:
Load and parse the XML and XSD.
Validate the XML against the schema.
Return the result: { valid: true/false, errors: [...] }.
Assertion: ensures result.valid is true.
If validation fails:
JSON.stringify(result.errors || result.error) helps by showing the detailed errors in the test output.
*/
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
