/* eslint-disable no-undef */
/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe("Test Legal MCSA Page", () => {
  it("confirms all pages elements including sidebar", () => {
    cy.visit('https://www.databricks.com/legal/us-pub-sector-services');
    cy.get('.mb-3:nth-child(1) > ul > li > ul > li:nth-child(1) > .cursor-pointer').click();
    cy.url().should('contains', 'https://www.databricks.com/legal/advisory-services-schedule');
    cy.get('.mb-3:nth-child(1) > ul > li > ul > li:nth-child(3) > .cursor-pointer').click();
    cy.url().should('contains', 'https://www.databricks.com/legal/us-pub-sector-services');
    cy.get('.mb-3:nth-child(1) > ul > li:nth-child(2) > .cursor-pointer').click();
    cy.url().should('contains', 'https://www.databricks.com/legal/terms-of-use');
    cy.get('.rich-text-body > p:nth-child(2)').click();
    cy.get('.rich-text-body > p:nth-child(2)').click();
    cy.get('.mb-3:nth-child(2) > ul > li:nth-child(2) > .cursor-pointer').click();
    cy.url().should('contains', 'https://www.databricks.com/legal/cookie-policy');
    cy.get('p:nth-child(13) > a').click();
    cy.get('.save-preference-btn-handler').click();

  })
})
