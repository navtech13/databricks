/* eslint-disable no-undef */

// Deal with "Uncaught ReferenceError: ttd_dom_ready is not defined" issue and others that were failing the test
Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  return false
})

describe("Test CPRA Features", () => {
  it("Checks for GPC icon, OneTrust functionality", () => {
    cy.visit(Cypress.env('base_url') + '/company/contact', Cypress.env('auth'));
    cy.get('#onetrust-accept-btn-handler').should('exist').click();
    cy.get('.dbgpcicon').should('be.visible');
    cy.get('.dbyourprivacychoices').click();
    cy.get('.ot-pc-header').should('be.visible');
  })
})
