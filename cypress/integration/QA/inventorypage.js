import { login } from "../../support/utils";
import { searchItem } from "../../support/utils";

describe("Inventory Page", () => {
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
  it("new items show on the inventory page be present", () => {
    const nameItem = "Red Hat";
    //Create Item
    cy.get("p>a").contains("Create new item +").click();
    cy.get("#title").type(nameItem);
    cy.get("#description").type("beautiful blue hat with print for men");
    cy.get("#price").type("99 USD");

    cy.get("input[type=file]")
      .as("input")
      .add_file("../fixtures/images/shoes.jpg", "image/jpg")
      .trigger("change", { force: true });
    cy.waitUntil(() =>
      cy
        .get("form div[style^='display: inline-block']")
        .then((elements) => elements.length === 1)
    );
    cy.get("form").submit();
    cy.url().should("include", "/items/");
    //upload images
    //cy.route("POST", "**/vendoo-qa-test*").as("postImagen");
    cy.get("a[href]").contains("Back to Inventory").click();
    cy.wait("@getAccountInfo");
    searchItem(nameItem);
  });
  it.only(" new edits to the items also show on the inventory page", () => {
    const nameItem = "Red Hat";
    //Create Item
    cy.get("p>a").contains("Create new item +").click();
    cy.get("#title").type(nameItem);
    cy.get("#description").type("beautiful blue hat with print for men");
    cy.get("#price").type("99 USD");
    cy.get("input[type=file]")
      .as("input")
      .add_file("../fixtures/images/shoes.jpg", "image/jpg")
      .trigger("change", { force: true });
    cy.waitUntil(() =>
      cy
        .get("form div[style^='display: inline-block']")
        .then((elements) => elements.length === 1)
    );
    cy.get("form").submit();
    cy.url().should("include", "/items/");
    //cy.get("a[href]").contains("Back to Inventory").click();
    //cy.waitUntil(() =>
    //cy
    // .get("h4")
    //.contains("Your items")
    //.then((element) => element.length === 1)
    //);
    cy.visit("http://localhost:3000/inventory");
    searchItem(nameItem);
    cy.get("#title").clear().type("blueeeeeee hattttt");
    //cy.get("a[href]").contains("Back to Inventory").click();
    //cy.waitUntil(() =>
    // cy
    //  .get("form div[style^='display: inline-block']")
    //  .then((elements) => elements.length === 1)
    //);
    cy.get("button").contains("Save").click();
    cy.wait(2000);
    cy.visit("http://localhost:3000/inventory");
    cy.get("input[type=text]").type("blueeeeeee hattttt").type("{enter}");
    cy.get("h4")
      .contains("blueeeeeee hattttt", { matchCase: false })
      .first()
      .contains("Title")
      .should("have.text", "Title: blueeeeeee hattttt");
  });
});
