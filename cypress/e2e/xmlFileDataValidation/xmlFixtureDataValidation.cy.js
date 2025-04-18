/// <reference types="cypress" />
import { saveXmlFromApi } from "../../support/utils/validateXml";

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

  // This Cypress test validates that an XML file (note.xml) from W3Schools
  it("should validate XML structure and content - using Api response", () => {
    // Sends an HTTP GET request to fetch the note.xml file from W3Schools.
    // Asserts that the response status code is 200 OK.
    cy.request("https://www.w3schools.com/xml/note.xml").then((response) => {
      expect(response.status).to.eq(200);
      // cy.window() to access the browser’s DOMParser (a built-in JavaScript tool).
      cy.window().then((win) => {
        const parser = new win.DOMParser();
        // // This line takes the raw XML string (which came from an API response) and parses it into an actual XML Document object.
        const xmlDoc = parser.parseFromString(response.body, "application/xml");
        // Uses querySelector to extract and assert specific values inside XML tags:
        expect(xmlDoc.querySelector("to").textContent).to.eq("Tove"); // <to> should be "Tove"
        expect(xmlDoc.querySelector("from").textContent).to.eq("Jani"); // <from> should be "Jani"
        expect(xmlDoc.querySelector("heading").textContent).to.eq("Reminder"); // <heading> should be "Reminder"
      });
    });
  });
});

describe("Validate breakfast_menu XML from URL ", () => {
  it("should validate structure and content", () => {
    cy.request("https://www.w3schools.com/xml/simple.xml") //  Replace with actual URL
      .then((response) => {
        //  Check status
        expect(response.status).to.eq(200);

        // Parse and validate XML content
        cy.window().then((win) => {
          const parser = new win.DOMParser();
          const xmlDoc = parser.parseFromString(
            response.body,
            "application/xml"
          );

          const foods = xmlDoc.getElementsByTagName("food");
          expect(foods.length).to.eq(5); // Should be 5 food items

          const firstFood = foods[0];
          expect(firstFood.querySelector("name").textContent).to.eq(
            "Belgian Waffles"
          );
          expect(firstFood.querySelector("price").textContent).to.eq("$5.95");
          expect(firstFood.querySelector("calories").textContent).to.eq("650");

          const lastFood = foods[4];
          expect(lastFood.querySelector("name").textContent).to.eq(
            "Homestyle Breakfast"
          );
          expect(lastFood.querySelector("price").textContent).to.eq("$6.95");
          expect(lastFood.querySelector("calories").textContent).to.eq("950");
        });
      });
  });
});

describe("Save XML from API to fixture", () => {
  it("saves breakfast menu XML and validates content", () => {
    // Step 1: Save the XML from the API into a fixture file
    saveXmlFromApi("https://www.w3schools.com/xml/simple.xml", "breakfast.xml");

    // Step 2: Wait for the file to be written and then validate it
    cy.readFile("cypress/fixtures/breakfast.xml").then((xmlString) => {
      // Parse the XML string into a DOM object
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlString, "application/xml");

      // Get all <food> elements
      const foods = xmlDoc.getElementsByTagName("food");
      expect(foods.length).to.eq(5); // Expected 5 food items

      // Validate first food item
      const firstFood = foods[0];
      expect(firstFood.querySelector("name").textContent.trim()).to.eq(
        "Belgian Waffles"
      );
      expect(firstFood.querySelector("price").textContent.trim()).to.eq(
        "$5.95"
      );
      expect(firstFood.querySelector("calories").textContent.trim()).to.eq(
        "650"
      );

      // Validate last food item
      const lastFood = foods[4];
      expect(lastFood.querySelector("name").textContent.trim()).to.eq(
        "Homestyle Breakfast"
      );
      expect(lastFood.querySelector("price").textContent.trim()).to.eq("$6.95");
      expect(lastFood.querySelector("calories").textContent.trim()).to.eq(
        "950"
      );
    });
  });
});

describe("Validate XML file data dynamically", () => {
  it("reads XML and validates dynamic content", () => {
    // Step 1: Save the XML from the API into a fixture file
    saveXmlFromApi("https://www.w3schools.com/xml/simple.xml", "breakfast.xml");

    // Step 2: Wait for the file to be written and then validate it
    cy.readFile("cypress/fixtures/breakfast.xml").then((xmlString) => {
      // Parse the XML string into a DOM object
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlString, "application/xml");

      // Step 3: Extract <food> elements dynamically
      const foods = xmlDoc.getElementsByTagName("food");
      expect(foods.length).to.be.greaterThan(0); // Ensure there is at least one <food> element

      // Step 4: Loop through each food item and validate its structure dynamically
      Array.from(foods).forEach((food) => {
        // Validate that each <food> item has <name>, <price>, and <calories>
        const name = food.querySelector("name")?.textContent.trim();
        const price = food.querySelector("price")?.textContent.trim();
        const calories = food.querySelector("calories")?.textContent.trim();

        // Validate that the fields are not empty
        expect(name).to.not.be.empty;
        expect(price).to.not.be.empty;
        expect(calories).to.not.be.empty;

        // Validate the format of the price (e.g., "$x.xx")
        expect(price).to.match(/^\$\d+\.\d{2}$/); // Ensure price is in format $x.xx

        // Validate that calories are a number
        expect(calories).to.match(/^\d+$/); // Ensure calories is a number
      });
    });
  });
});
