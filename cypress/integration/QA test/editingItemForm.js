import { login } from "../../support/utils";
describe("Editing Item Form", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.server({
      matchingOptions: { matchBase: false },
    });
    cy.route("POST", "**/getAccountInfo*").as("getAccountInfo");
    cy.route("POST", "**/verifyPassword*").as("verifyPassword");
    login("test2@test.com", "Ldn7899cnmnm");
    cy.wait("@getAccountInfo");
    cy.route("POST", "**/verifyPassword*").as("verifyPassword");
    cy.wait(["@verifyPassword", "@getAccountInfo"]);
  });
  it("Edit Item", () => {
    cy.server({
      matchingOptions: { matchBase: false },
    });
    cy.route("POST", "**/getAccountInfo*").as("getAccountInfo");
    cy.get("h4")
      .contains("Title: shoes")
      .get("a[href^='/items']")
      .contains("View Item")
      .click();
    cy.wait("@getAccountInfo");
    //editing item form update one item
    cy.get("#title").clear().type("Boots");
    cy.get("#description").clear().type("brown leather boots");
    cy.get("#price").clear().type("35 USD");
    cy.get("button").contains("Save").click();
    cy.get("div")
      .get("a[href^='/inventory']")
      .contains("Back to Inventory")
      .click();
    //check database update item
    cy.get("h4")
      .contains("Title: Boots")
      .get("a[href^='/items']")
      .contains("View Item")
      .click();
    cy.wait(2000);
    cy.wait("@getAccountInfo");
    cy.get("#title").should("have.value", "Boots");
    cy.get("#description").should("have.text", "brown leather boots");
    cy.get("#price").should("have.value", "35 USD");
  });
});
