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

describe("Meta tags", () => {
  it("checks some meta tags exist", () => {
    cy.visit("https://www.databricks.com/")
    cy.document()
      .get('head link[rel="canonical"]')
      .should("exist")
      .and("have.attr", "href", "https://www.databricks.com/")

    cy.document()
      .get('head meta[name="twitter:card"]')
      .should("exist")
      .and("have.attr", "content", "summary_large_image")
  })
})
