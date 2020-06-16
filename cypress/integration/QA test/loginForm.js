describe("Longig Form", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });
  it("successful Login", () => {
    cy.server({
      matchingOptions: { matchBase: false },
    });
    cy.route("POST", "**/getAccountInfo*").as("getAccountInfo");
    cy.get("#email").type("test1@test.com");
    cy.wait("@getAccountInfo");
    cy.get("#password").type("Ldn7899cnmnm");
    cy.route("POST", "**/verifyPassword*").as("verifyPassword");
    cy.get("button").contains("Login").click();
    cy.wait(["@verifyPassword", "@getAccountInfo"]);
  });
});
