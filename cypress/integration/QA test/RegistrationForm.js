//function for matemathics register
function mathematicalOperatorResult(a, b, operator) {
  switch (operator) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      return a / b;
    default:
      console.log(`Sorry, we are out of ${expr}.`);
  }
}
function calculateMathOperation(text) {
  const lessSecurity = text.replace("(Security) ", "");
  const lessEqualAndQuestion = lessSecurity.replace("= ?", "");
  const mathematicalOperator = lessEqualAndQuestion.substr(2, 1);
  const fistNumber = parseInt(lessEqualAndQuestion.substr(0, 1));
  const secondNumber = parseInt(lessEqualAndQuestion.substr(4, 1));
  const resulOperation = mathematicalOperatorResult(
    fistNumber,
    secondNumber,
    mathematicalOperator
  );
  return resulOperation;
}

describe("Registration Form", () => {
  beforeEach(() => {});
  const number = Math.random(100000);
  const emailUser = `test${number}@test.com`;
  const password = "Ldn7899cnmnm";

  it("Registration Form - Test", () => {
    cy.visit("http://localhost:3000/register");
    cy.server();
    //cy.route("POST", "*").as("callPost");
    //cy.route("GET", "*").as("callGet");
    cy.get("#email").type(emailUser);
    //cy.wait("@callPost");
    cy.get("#password").type(password);
    const value = cy
      .get("label")
      .contains("(Security)")
      .invoke("text")
      .then((text) => {
        const resultMathOperation = calculateMathOperation(text);
        cy.get("#security").clear().type(resultMathOperation);
      });
    cy.get("button").contains("Register").click();
    //cy.wait(["@callPost", "@callPost"]);
    //validate new url
    cy.url().should("include", "/register");
    cy.get("button").click();
  });

  it("validate message for email used", () => {
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
