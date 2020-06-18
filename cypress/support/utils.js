export function login(username, password) {
  cy.get("#email").type(username);
  cy.get("#password").type(password);
  cy.get("button").contains("Login").click();
}

export function searchItem(itemName) {
  cy.get("h4")
    .contains("Title: " + itemName, { matchCase: false })
    .get("a[href^='/items']")
    .contains("View Item")
    .click();
}
