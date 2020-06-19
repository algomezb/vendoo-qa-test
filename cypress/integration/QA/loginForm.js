function login(username, password) {
  cy.get("#email").type(username);
  cy.get("#password").type(password);
  cy.get("button").contains("Login").click();
}

describe("LongIn Form", () => {
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
    cy.route("POST", "**/verifyPassword*").as("verifyPassword");
    login("test2@test.com", "Ldn7899");
    cy.wait("@verifyPassword");
    cy.get("div")
      .contains("FORM ERROR:")
      .should(
        "have.text",
        "FORM ERROR: The password is invalid or the user does not have a password."
      );
  });

  it("successful Login", () => {
    cy.route("POST", "**/getAccountInfo*").as("getAccountInfo");
    cy.route("POST", "**/verifyPassword*").as("verifyPassword");
    login("test2@test.com", "Ldn7899cnmnm");
    cy.wait(["@getAccountInfo", "@verifyPassword"]);
    cy.waitUntil(() => cy.url().should("contain", "inventory"));
    cy.url().should("include", "inventory");
  });
});
