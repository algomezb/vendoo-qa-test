// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
import "cypress-wait-until";

Cypress.Commands.add(
  "add_file",
  {
    prevSubject: "element",
  },
  (input, fileName, fileType) => {
    cy.fixture(fileName)
      .then((content) => Cypress.Blob.base64StringToBlob(content, fileType))
      .then((blob) => {
        // We need the window to acces native (not nodejs) files and dt
        return cy.window().then((window) => {
          const testFile = new window.File([blob], fileName, {
            type: fileType,
          });
          const dataTransfer = new window.DataTransfer();
          dataTransfer.items.add(testFile);
          input[0].files = dataTransfer.files;
          return input;
        });
      });
  }
);
