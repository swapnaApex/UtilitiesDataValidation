describe("XML File Validation", () => {
  it("should validate the structure and content of the XML file - Fixtures", () => {
    // Step 1: Read the XML file from the fixtures folder
    cy.readFile("cypress/fixtures/sample1.xml").then((xmlString) => {
      // Step 2: Parse the XML string into a DOM object
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlString, "application/xml");

      // Log the parsed XML to the console for debugging
      console.log(xmlDoc);

      // Step 3: Perform assertions on the XML structure

      // Check if the root element is <root>
      const rootElement = xmlDoc.documentElement;
      expect(rootElement.nodeName).to.equal("root");

      // Validate the first <person> element
      const firstPerson = xmlDoc.getElementsByTagName("person")[0];

      // Check if firstPerson is not null or undefined
      expect(firstPerson).to.not.be.null;

      // If it's a valid element, validate its content
      const firstName = firstPerson.querySelector("name").textContent;
      expect(firstName).to.equal("John Doe");

      const firstAge = firstPerson.querySelector("age").textContent;
      expect(firstAge).to.equal("30");

      const firstEmail = firstPerson.querySelector("email").textContent;
      expect(firstEmail).to.equal("john.doe@example.com");

      // Validate the second <person> element
      const secondPerson = xmlDoc.getElementsByTagName("person")[1];
      expect(secondPerson).to.not.be.null;

      const secondName = secondPerson.querySelector("name").textContent;
      expect(secondName).to.equal("Jane Smith");

      const secondAge = secondPerson.querySelector("age").textContent;
      expect(secondAge).to.equal("25");

      const secondEmail = secondPerson.querySelector("email").textContent;
      expect(secondEmail).to.equal("jane.smith@example.com");

      // Validate the <book> element
      const book = xmlDoc.getElementsByTagName("book")[0];
      expect(book).to.not.be.null;

      const bookTitle = book.querySelector("title").textContent;
      expect(bookTitle).to.equal("The Adventure Begins");

      const bookAuthor = book.querySelector("author").textContent;
      expect(bookAuthor).to.equal("Robert Johnson");

      const bookYear = book.querySelector("year").textContent;
      expect(bookYear).to.equal("2022");
    });
  });

  it("should validate the content of the XML file - URL", () => {
    cy.request("https://www.w3schools.com/xml/note.xml") // Visit the URL that contains XML
      .then((response) => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(response.body, "application/xml");

        const rootElement = xmlDoc.documentElement;
        expect(rootElement.nodeName).to.equal("note");

        const to = xmlDoc.getElementsByTagName("to")[0].textContent;
        expect(to).to.equal("Tove");

        const from = xmlDoc.getElementsByTagName("from")[0].textContent;
        expect(from).to.equal("Jani");

        const heading = xmlDoc.getElementsByTagName("heading")[0].textContent;
        expect(heading).to.equal("Reminder");

        const body = xmlDoc.getElementsByTagName("body")[0].textContent;
        expect(body).to.equal("Don't forget me this weekend!");
      });
  });
});
