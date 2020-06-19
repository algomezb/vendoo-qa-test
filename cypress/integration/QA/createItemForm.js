import { login } from "../../support/utils";
import { searchItem } from "../../support/utils";

describe("Create Item Form", () => {
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

  it("Create new item", () => {
    cy.get("p>a").contains("Create new item +").click();
    cy.get("#title").type("Shoes");
    cy.get("#description").type("beautiful blue shoes with print for men");
    cy.get("#price").type("35 USD");
    //upload images
    //cy.route("POST", "**/vendoo-qa-test*").as("postImagen");
    cy.get("input[type=file]")
      .as("input")
      .add_file("../fixtures/images/shoes.jpg", "image/jpg")
      .trigger("change", { force: true })
      // cy.wait("@postImagen")
      .get("@input")
      .add_file("../fixtures/images/shoes.jpg", "image/jpg")
      .trigger("change", { force: true })
      .get("@input")
      .add_file("../fixtures/images/shoes.jpg", "image/jpg")
      .trigger("change", { force: true })
      .get("@input")
      .add_file("../fixtures/images/shoes.jpg", "image/jpg")
      .trigger("change", { force: true })
      .get("@input")
      .add_file("../fixtures/images/shoes.jpg", "image/jpg")
      .trigger("change", { force: true })
      .get("@input")
      .add_file("../fixtures/images/shoes.jpg", "image/jpg")
      .trigger("change", { force: true })
      .get("@input")
      .add_file("../fixtures/images/shoes.jpg", "image/jpg")
      .trigger("change", { force: true })
      .get("@input")
      .add_file("../fixtures/images/shoes.jpg", "image/jpg")
      .trigger("change", { force: true });
    cy.waitUntil(() =>
      cy
        .get("form div[style^='display: inline-block']")
        .then((elements) => elements.length === 8)
    );
    cy.get("form").submit();
    cy.url().should("include", "/items/");
    cy.get("h1").should("have.text", "Edit Item");
  });
  it.only("Only 8 images", () => {
    // const numberPhotos = lessSecurity.replace("= ?", "");
    cy.server({
      matchingOptions: { matchBase: false },
    });
    cy.route("POST", "**/getAccountInfo*").as("getAccountInfo");
    searchItem("shoes");
    cy.wait("@getAccountInfo");
    //try to upload new image
    cy.get("input[type=file]")
      .as("input")
      .add_file("../fixtures/images/shoes.jpg", "image/jpg")
      .trigger("change", { force: true });
    cy.get("form div[style^='display: inline-block']").should("have.length", 8);
    //const value = cy.get("label").contains("Photos").its("text");
  });
});
