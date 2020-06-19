import { login, createItem, searchItem } from "../../support/utils";
describe("Editing Item Form", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.server({
      matchingOptions: { matchBase: false },
    });
    cy.route("POST", "**/getAccountInfo*").as("getAccountInfo");
    cy.route("POST", "**/verifyPassword*").as("verifyPassword");
    login("test46@test.com", "Ldn7899cnmnm");
    cy.wait("@getAccountInfo");
    cy.route("POST", "**/verifyPassword*").as("verifyPassword");
    cy.wait(["@verifyPassword", "@getAccountInfo"]);
  });
  it("Edit Item", () => {
    cy.server({
      matchingOptions: { matchBase: false },
    });
    cy.route("POST", "**/getAccountInfo*").as("getAccountInfo");
    const nameItem = "shoes blue suede";
    const descripcion = "beautiful shoes";
    const price = "USD 78";
    createItem(nameItem, descripcion, price);
    cy.wait(4000);
    cy.visit("http://localhost:3000/inventory");
    cy.get("input[placeholder='Search your inventory']")
      .type(nameItem)
      .type("{enter}");
    searchItem(nameItem);
    //editing item form update one item
    const newname = "Boots 44";
    const newDescription = "brown leather boots";
    const newPrice = "45USD";
    cy.get("#title").clear().type(newname);
    cy.get("#description").clear().type(newDescription);
    cy.get("#price").clear().type(newPrice);
    cy.get("button").contains("Save").click();
    cy.wait(3000);
    cy.visit("http://localhost:3000/inventory");
    searchItem(newname);
    //check database update item
    cy.wait(2000);
    cy.wait("@getAccountInfo");
    cy.get("#title").should("have.value", newname);
    cy.get("#description").should("have.text", newDescription);
    cy.get("#price").should("have.value", newPrice);
  });
});
