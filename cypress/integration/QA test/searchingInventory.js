import { login } from "../../support/utils";
describe("Searching inventory", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.server({
      matchingOptions: { matchBase: false },
    });
    cy.route("POST", "**/getAccountInfo*").as("getAccountInfo");
    cy.route("POST", "**/verifyPassword*").as("verifyPassword");
    login("test1@test.com", "Ldn7899cnmnm");
    cy.wait("@getAccountInfo");
    cy.route("POST", "**/verifyPassword*").as("verifyPassword");
    cy.wait(["@verifyPassword", "@getAccountInfo"]);
  });
  it("inventory search", () => {
    cy.get("input[placeholder='Search your inventory']")
      .type("boots")
      .type("{enter}");
    cy.get("h4").should("contain", "boots", { matchCase: false });
  });
});
