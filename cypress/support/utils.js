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
