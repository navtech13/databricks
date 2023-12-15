describe("Test Legal MSCA Page", () => {
  it("'confirms page loaded", () => {
	cy.visit(Cypress.env('base_url') + '/legal/mcsa' , Cypress.env('auth'));
	cy.wait(1000);
  })
  it("confirms all pages elements including sidebar", () => {
   cy.visit(Cypress.env('base_url') + '/legal/mcsa' , Cypress.env('auth'));
   cy.get('[data-cy="databricks-master-cloud-services-agreement"] > .cursor-pointer').click();
   cy.url().should('contains', Cypress.env('base_url') + '/legal/mcsa');
   cy.get('[data-cy="advisory-services"] > .cursor-pointer').click();
   cy.url().should('contains', Cypress.env('base_url') + '/legal/advisory-services-schedule');
   cy.get('[data-cy="training-services"] > .cursor-pointer').click();
   cy.url().should('contains', Cypress.env('base_url') + '/legal/training-services-schedule');
   cy.get('[data-cy="us-public-sector-services"] > .cursor-pointer').click();
   cy.url().should('contains', Cypress.env('base_url') + '/legal/us-pub-sector-services');
   cy.get('[data-cy="external-user-terms"] > .cursor-pointer').click();
   cy.url().should('contains', Cypress.env('base_url') + '/legal/external-user-terms');
   cy.get('[data-cy="website-terms-of-use"] > .cursor-pointer').click();
   cy.url().should('contains', Cypress.env('base_url') + '/legal/terms-of-use');
   cy.get('[data-cy="community-edition-terms-of-service"] > .cursor-pointer').click();
   cy.url().should('contains', Cypress.env('base_url') + '/legal/databricks-community-edition');
   cy.get('[data-cy="acceptable-use-policy"] > .cursor-pointer').click();
   cy.url().should('contains', Cypress.env('base_url') + '/legal/aup');
   cy.get('[data-cy="privacy-notice"] > .cursor-pointer').click();
   cy.url().should('contains', Cypress.env('base_url') + '/legal/privacynotice');   
   cy.get('[data-cy="cookie-notice"] > .cursor-pointer').click();
   cy.url().should('contains', Cypress.env('base_url') + '/legal/cookienotice');
   cy.get('[data-cy="applicant-privacy-notice"] > .cursor-pointer').click();
   cy.url().should('contains', Cypress.env('base_url') + '/legal/applicant-privacy-notice');
   cy.get('[data-cy="databricks-subprocessors"] > .cursor-pointer').click();
   cy.url().should('contains', Cypress.env('base_url') + '/legal/databricks-subprocessors');
   cy.get('[data-cy="privacy-faqs"] > .cursor-pointer').click();
   cy.url().should('contains', Cypress.env('base_url') + '/legal/gdpr-faqs');
   cy.get('[data-cy="databricks-data-processing-addendum"] > .cursor-pointer').click();
   cy.url().should('contains', Cypress.env('base_url') + '/legal/databricks-data-processing-addendum');
   cy.get('[data-cy="amendment-to-data-processing-addendum"] > .cursor-pointer').click();
   cy.url().should('contains', Cypress.env('base_url') + '/legal/scc-customers');
   cy.get('[data-cy="databricks-security"] > .cursor-pointer').click();
   cy.url().should('contains', Cypress.env('base_url') + '/trust');
   cy.get('[data-cy="security-addendum"] > .cursor-pointer').click();
   cy.url().should('contains', Cypress.env('base_url') + '/legal/security-addendum');
   cy.get('[data-cy="legal-compliance-ethics"] > .cursor-pointer').click();
   cy.url().should('contains', Cypress.env('base_url') + '/legal/compliance-ethics');
   cy.get('[data-cy="code-of-conduct"] > .cursor-pointer').click();
   cy.url().should('contains', Cypress.env('base_url') + '/global-code-of-conduct?_ga=2.104187200.1186712231.1672660045-111291326.1664819432');
   cy.get('[data-cy="modern-slavery-statement"] > .cursor-pointer').click();
   cy.url().should('contains', Cypress.env('base_url') + '/legal/modern-slavery-statement?_ga=2.104187200.1186712231.1672660045-111291326.1664819432');


  })
  it("checks meta tags exist", () => {
    cy.visit(Cypress.env('base_url') + '/legal/mcsa' , Cypress.env('auth'));
    cy.document()
      .get('head link[rel="canonical"]')
      .should("exist")
      .and("have.attr", "href", Cypress.env('base_url') + "/legal/mcsa")
    cy.document()
      .get('head meta[name="title"]')
      .should("exist")
      .and("have.attr", "content", "Master Cloud Services Agreement | Databricks")
	cy.document()
      .get('head meta[name="description"]')
      .should("exist")
      .and("have.attr", "content", "This Master Cloud Services Agreement (the “MCSA”) is entered into as of the Effective Date between Databricks, Inc. (“Databricks” or “we”) and Customer (as defined below) and governs Customer’s use of the Databricks Services, including the right to access and use the Databricks data processing platform services (the “Platform Services”), on each cloud service where Databricks directly provides customers with access to such Platform Services.")
	cy.document()
      .get('head meta[property="og:image"]')
      .should("exist")
      .and("have.attr", "content", Cypress.env('base_url') + "/legal-assets/static/og-databricks-58419d0d868b05ddb057830066961ebe.png")	
  })
  it("checks title exist", () => {
	  cy.visit(Cypress.env('base_url') + '/legal/mcsa' , Cypress.env('auth'));
	  cy.get('[data-cy="title"]').invoke("text").should("have.length.gt", 0)
  })
  
})
