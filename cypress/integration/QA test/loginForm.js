function login(username, password) {
  cy.get("#email").type(username);
  cy.get("#password").type(password);
  cy.get("button").contains("Login").click();
}

describe("Longig Form", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
    cy.visit("http://localhost:3000/");
    cy.server({
      matchingOptions: { matchBase: false },
    });
  });
  afterEach(() => {
    //cy.get("button").contains("Log Out").click();
  });

  it("message for incorrect passwords", () => {
    cy.route("POST", "**/getAccountInfo*").as("getAccountInfo");
    cy.route("POST", "**/verifyPassword*").as("verifyPassword");
    login("test1@test.com", "Ldn7899");
    cy.wait(["@verifyPassword", "@getAccountInfo"]);
    cy.get("div")
      .contains("FORM ERROR:")
      .should(
        "have.text",
        "FORM ERROR: The password is invalid or the user does not have a password."
      );
  });

  it("successful Login", () => {
    cy.server({
      matchingOptions: { matchBase: false },
    });
    cy.route("POST", "**/getAccountInfo*").as("getAccountInfo");
    cy.route("POST", "**/verifyPassword*").as("verifyPassword");
    login("test1@test.com", "Ldn7899cnmnm");
    cy.wait("@getAccountInfo");
    cy.route("POST", "**/verifyPassword*").as("verifyPassword");
    cy.wait(["@verifyPassword", "@getAccountInfo"]);
    cy.url().should("include", "/inventory");
  });
});
