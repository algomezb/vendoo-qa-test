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

export function createItem(nameItem, descripcion, price) {
  //Create Item
  cy.get("p>a").contains("Create new item +").click();
  cy.get("#title").type(nameItem);
  cy.get("#description").type(descripcion);
  cy.get("#price").type(price);

  cy.get("input[type=file]")
    .as("input")
    .add_file("../fixtures/images/shoes.jpg", "image/jpg")
    .trigger("change", { force: true });
  cy.waitUntil(() =>
    cy
      .get("form div[style^='display: inline-block']")
      .then((elements) => elements.length === 1)
  );
  cy.get("form").submit();
  cy.url().should("include", "/items/");
}
