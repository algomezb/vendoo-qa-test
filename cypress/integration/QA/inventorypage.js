import { login } from "../../support/utils";
import { searchItem, createItem } from "../../support/utils";

describe("Inventory Page", () => {
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
  it("new items show on the inventory page be present", () => {
    const nameItem = "gray Hat 99";
    const descripcion = "beautiful hat";
    const price = "USD 78";
    createItem(nameItem, descripcion, price);
    cy.wait(3000);
    //upload images
    cy.visit("http://localhost:3000/inventory");
    cy.get("input[placeholder='Search your inventory']")
      .type(nameItem)
      .type("{enter}");
  });
  it(" new edits to the items also show on the inventory page", () => {
    const nameItem = "sombrero";
    const descripcion = "beautiful hat";
    const price = "USD 78";
    createItem(nameItem, descripcion, price);
    cy.wait(3000);

    cy.visit("http://localhost:3000/inventory");
    cy.get("input[placeholder='Search your inventory']")
      .type(nameItem)
      .type("{enter}");
    searchItem(nameItem);
    //new name
    const newName = "browm shoes";
    cy.get("#title").clear().type(newName);
    cy.get("button").contains("Save").click();
    cy.wait(2000);
    cy.visit("http://localhost:3000/inventory");
    cy.get("input[type=text]").type(newName).type("{enter}");
    cy.get("h4")
      .contains(newName, { matchCase: false })
      .first()
      .contains("Title")
      .should("have.text", "Title: " + newName);
  });
});
