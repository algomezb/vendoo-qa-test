import { login } from "../../support/utils";
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
    cy.route("POST", "**/vendoo-qa-test*").as("postImagen");

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
    //cy.wait(2000);
    cy.get("form").submit();
    cy.wait("@getAccountInfo");
  });
});
