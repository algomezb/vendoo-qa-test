import {
  newUser,
  mathematicalOperatorResult,
  calculateMathOperation,
} from "../../support/utils";

describe("Registration Form", () => {
  beforeEach(() => {
    cy.server({
      matchingOptions: { matchBase: false },
    });
  });

  it("Registration Form Complete of the user", () => {
    newUser();

    cy.url().should("include", "/register");
    cy.get("button").click();
  });

  it("validate message for email used", () => {
    const number = Math.random(100000);
    const emailUser = `test${number}@test.com`;
    const password = "Ldn7899cnmnm";
    cy.visit("http://localhost:3000/register");
    cy.server();
    cy.route("POST", "*").as("callPost");
    cy.get("#email").type("test1@test.com");
    cy.get("#password").type(password);
    const value = cy
      .get("label")
      .contains("(Security)")
      .invoke("text")
      .then((text) => {
        const resultMathOperation = calculateMathOperation(text);
        cy.get("#security").clear().type(resultMathOperation);
      });
    cy.get("button").click();
    cy.wait(["@callPost"]);
    cy.get("div")
      .contains("FORM ERROR")
      .should(
        "have.text",
        "FORM ERROR: The email address is already in use by another account."
      );
  });
});
