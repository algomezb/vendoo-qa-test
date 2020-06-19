import { login } from "../../support/utils";
import { searchItem } from "../../support/utils";

describe("Item Form", () => {
  const nameitem = "Red Shoes";
  const desciption = "beautiful blue shoes with print for men";
  const price = "23 USD";
  before(() => {
    cy.addUserAndLogIn();
  });
  beforeEach(() => {
    //cy.visit("http://localhost:3000/");
    cy.server({
      matchingOptions: { matchBase: false },
    });

    //cy.route("POST", "**/getAccountInfo*").as("getAccountInfo");
    //cy.route("POST", "**/verifyPassword*").as("verifyPassword");
    //login("test2@test.com", "Ldn7899cnmnm");
    //cy.wait("@getAccountInfo");
    //cy.route("POST", "**/verifyPassword*").as("verifyPassword");
    //cy.wait(["@verifyPassword", "@getAccountInfo"]);
  });

  it("Create new item", () => {
    cy.get("p>a").contains("Create new item +").click();
    cy.get("#title").type(nameitem);
    cy.get("#description").type(desciption);
    cy.get("#price").type(price);
    cy.get("input[type=file]")
      .as("input")
      .add_file("../fixtures/images/shoes.jpg", "image/jpg")
      .trigger("change", { force: true });
    cy.waitUntil(() =>
      cy
        .get("form div[style^='display: inline-block']")
        .then((elements) => elements.length === 1)
    )
      .get("@input")
      .add_file("../fixtures/images/shoes.jpg", "image/jpg")
      .trigger("change", { force: true });
    cy.waitUntil(() =>
      cy
        .get("form div[style^='display: inline-block']")
        .then((elements) => elements.length === 2)
    )
      .get("@input")
      .add_file("../fixtures/images/shoes.jpg", "image/jpg")
      .trigger("change", { force: true });
    cy.waitUntil(() =>
      cy
        .get("form div[style^='display: inline-block']")
        .then((elements) => elements.length === 3)
    )
      .get("@input")
      .add_file("../fixtures/images/shoes.jpg", "image/jpg")
      .trigger("change", { force: true });
    cy.waitUntil(() =>
      cy
        .get("form div[style^='display: inline-block']")
        .then((elements) => elements.length === 4)
    )
      .get("@input")
      .add_file("../fixtures/images/shoes.jpg", "image/jpg")
      .trigger("change", { force: true });
    cy.waitUntil(() =>
      cy
        .get("form div[style^='display: inline-block']")
        .then((elements) => elements.length === 5)
    )
      .get("@input")
      .add_file("../fixtures/images/shoes.jpg", "image/jpg")
      .trigger("change", { force: true });
    cy.waitUntil(() =>
      cy
        .get("form div[style^='display: inline-block']")
        .then((elements) => elements.length === 6)
    )
      .get("@input")
      .add_file("../fixtures/images/shoes.jpg", "image/jpg")
      .trigger("change", { force: true });
    cy.waitUntil(() =>
      cy
        .get("form div[style^='display: inline-block']")
        .then((elements) => elements.length === 7)
    )
      .get("@input")
      .add_file("../fixtures/images/shoes.jpg", "image/jpg")
      .trigger("change", { force: true });
    cy.waitUntil(() =>
      cy
        .get("form div[style^='display: inline-block']")
        .then((elements) => elements.length === 8)
    );
    cy.get("form")
      .submit()
      .url()
      .should("include", "/items/")
      .waitUntil(() =>
        cy.get("h1").then((element) => {
          return element.text() === "Edit Item";
        })
      );
    //cy.wait(7000);
    cy.get("h1").contains("Edit Item").should("have.text", "Edit Item");
  });

  it("only allow 8 images", () => {
    cy.server({
      matchingOptions: { matchBase: false },
    });
    cy.visit("http://localhost:3000/inventory");
    cy.route("POST", "**/getAccountInfo*").as("getAccountInfo");
    searchItem(nameitem);
    cy.wait("@getAccountInfo");
    //try to upload new image to recently added item
    cy.get("input[type=file]")
      .as("input")
      .add_file("../fixtures/images/shoes.jpg", "image/jpg")
      .trigger("change", { force: true });
    cy.get("form div[style^='display: inline-block']").should("have.length", 8);
  });
});
