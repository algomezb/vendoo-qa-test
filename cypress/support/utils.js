export function login(username, password) {
  cy.get("#email").type(username);
  cy.get("#password").type(password);
  cy.get("button").contains("Login").click();
}
//open link
export function searchItem(itemName) {
  cy.get("h4")
    .contains(itemName, { matchCase: false })
    .first()
    .siblings("a[href^='/items']")
    .contains("View Item")
    .click();
}

//function for matemathics register
export function mathematicalOperatorResult(a, b, operator) {
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

export function calculateMathOperation(text) {
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
//register new user
export function newUser() {
  const number = Math.random(100000);
  const emailUser = `test${number}@test.com`;
  const password = "Ldn7899cnmnm";
  cy.visit("http://localhost:3000/register");
  cy.server();
  cy.route("POST", "**/getAccountInfo*").as("getAccountInfo");
  cy.route("POST", "**/signupNewUser*").as("getNewUser");
  cy.get("#email").type(emailUser);
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
  cy.wait("@getNewUser");
  cy.wait("@getAccountInfo");
}
