describe("Newsroom Page", () => {
  it("confirms page loaded", () => {
	cy.visit(Cypress.env('base_url') +'/company/newsroom/', Cypress.env('auth'));
	cy.wait(1000);
  })
  it("confirms featured stories links", () => {
	cy.visit(Cypress.env('base_url') +'/company/newsroom/', Cypress.env('auth'));
	cy.wait(1000);
	cy.get('[data-cy="Grid"] .shadow-card-normal a').each(page => {
    cy.request(page.prop('href'))
	})
  })
  it("confirms More headlines section read now links", () => {
	cy.visit(Cypress.env('base_url') +'/company/newsroom/', Cypress.env('auth'));
	cy.get('[data-cy="Headline"] > [data-cy="PressRelease"] > .cursor-pointer').each(page => {
		cy.request(page.prop('href'))
	})	
  })
  it("confirms press release section read now links and see all Press release button link", () => {
	cy.visit(Cypress.env('base_url') +'/company/newsroom/', Cypress.env('auth'));
	cy.get('[data-cy="PressRelease"] > .cursor-pointer').each(page => {
		cy.request(page.prop('href'))
	})
	cy.get('[data-cy="PressReleases"] > [data-cy="Button"]').click();
	cy.url().should('contains', 'https://www.databricks.com/company/newsroom/press-releases');	
  }) 
  it('confirms Load More button click', function () {
	cy.visit(Cypress.env('base_url') +'/company/newsroom/press-releases', Cypress.env('auth'));
	cy.get('[data-cy="Button"] ').click()
	cy.get('[data-cy="PressRelease"]').should('have.length.greaterThan', 5);
  })
  
})