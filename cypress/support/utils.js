export function login(username, password) {
  cy.get("#email").type(username);
  cy.get("#password").type(password);
  cy.get("button").contains("Login").click();
}
