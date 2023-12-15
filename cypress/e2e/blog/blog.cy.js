describe("Test Blog post overview", () => {
  it("'confirms page loaded", () => {
	cy.visit(Cypress.env('base_url') + '/blog' , Cypress.env('auth'));
	cy.wait(1000);
  })
  it("'confirms blog page contains sidebar", () => {
	cy.visit(Cypress.env('base_url') + '/blog' , Cypress.env('auth'));
	cy.url().should('contains', Cypress.env('base_url') + '/blog');
	cy.get('[data-cy="company"] > .cursor-pointer').click();
	cy.url().should('contains', Cypress.env('base_url') + '/blog/category/company');
	cy.get('[data-cy="culture"] > .cursor-pointer').click();
	cy.url().should('contains', Cypress.env('base_url') + '/blog/category/company/culture');
	cy.get('[data-cy="customers"] > .cursor-pointer').click();
	cy.url().should('contains', Cypress.env('base_url') + '/blog/category/company/customers');
	cy.get('[data-cy="events"] > .cursor-pointer').click();
	cy.url().should('contains', Cypress.env('base_url') + '/blog/category/company/events');
	cy.get('[data-cy="news"] > .cursor-pointer').click();
	cy.url().should('contains', Cypress.env('base_url') + '/blog/category/company/news');
	cy.get('[data-cy="platform"] > .cursor-pointer').click();
	cy.url().should('contains', Cypress.env('base_url') + '/blog/category/platform');
	cy.get('[data-cy="announcements"] > .cursor-pointer').click();
	cy.url().should('contains', Cypress.env('base_url') + '/blog/category/platform/announcements');
	cy.get('[data-cy="partners"] > .cursor-pointer').click();
	cy.url().should('contains', Cypress.env('base_url') + '/blog/category/platform/partners');
	cy.get('[data-cy="product"] > .cursor-pointer').click();
	cy.url().should('contains', Cypress.env('base_url') + '/blog/category/platform/product');
	cy.get('[data-cy="solutions"] > .cursor-pointer').click();
	cy.url().should('contains', Cypress.env('base_url') + '/blog/category/platform/solutions');
	cy.get('[data-cy="engineering"] > .cursor-pointer').click();
	cy.url().should('contains', Cypress.env('base_url') + '/blog/category/engineering');
	cy.get('[data-cy="data-science-and-ml"] > .cursor-pointer').click();
	cy.url().should('contains', Cypress.env('base_url') + '/blog/category/engineering/data-science-machine-learning');
	cy.get('[data-cy="open-source"] > .cursor-pointer').click();
	cy.url().should('contains', Cypress.env('base_url') + '/blog/category/engineering/open-source');
	cy.get('[data-cy="solutions-accelerators"] > .cursor-pointer').click();
	cy.url().should('contains', Cypress.env('base_url') + '/blog/category/engineering/solution-accelerators');
	cy.get('[data-cy="data-engineering"] > .cursor-pointer').click();
	cy.url().should('contains', Cypress.env('base_url') + '/blog/category/engineering/data-engineering');
	cy.get('[data-cy="tutorials"] > .cursor-pointer').click();
	cy.url().should('contains', Cypress.env('base_url') + '/blog/category/engineering/tutorials');
	cy.get('[data-cy="data-streaming"] > .cursor-pointer').click();
	cy.url().should('contains', Cypress.env('base_url') + '/blog/category/engineering/data-streaming');
	cy.get('[data-cy="data-strategy"] > .cursor-pointer').click();
	cy.url().should('contains', Cypress.env('base_url') + '/blog/category/data-and-ai');
	cy.get('[data-cy="best-practices"] > .cursor-pointer').click();
	cy.url().should('contains', Cypress.env('base_url') + '/blog/category/data-and-ai/best-practices');
	cy.get('[data-cy="data-leader"] > .cursor-pointer').click();
	cy.url().should('contains', Cypress.env('base_url') + '/blog/category/data-and-ai/data-leader');
	cy.get('[data-cy="insights"] > .cursor-pointer').click();
	cy.url().should('contains', Cypress.env('base_url') + '/blog/category/data-and-ai/industry-insights');
	cy.get('[data-cy="industries"] > .cursor-pointer').click();
	cy.url().should('contains', Cypress.env('base_url') + '/blog/category/industries');
	cy.get('[data-cy="financial-services"] > .cursor-pointer').click();
	cy.url().should('contains', Cypress.env('base_url') + '/blog/category/industries/financial-services');
	cy.get('[data-cy="health-and-life-sciences"] > .cursor-pointer').click();
	cy.url().should('contains', Cypress.env('base_url') + '/blog/category/industries/health-and-life-sciences');
	cy.get('[data-cy="media-and-entertainment"] > .cursor-pointer').click();
	cy.url().should('contains', Cypress.env('base_url') + '/blog/category/industries/media-and-entertainment');
	cy.get('[data-cy="retail"] > .cursor-pointer').click();
	cy.url().should('contains', Cypress.env('base_url') + '/blog/category/industries/retail');
	cy.get('[data-cy="manufacturing"] > .cursor-pointer').click();
	cy.url().should('contains', Cypress.env('base_url') + '/blog/category/industries/manufacturing');
	cy.get('[data-cy="public-sector"] > .cursor-pointer').click();
	cy.url().should('contains', Cypress.env('base_url') + '/blog/category/industries/public-sector');

  })
  it("'confirms next/previous page and blog link", () => {
	cy.visit(Cypress.env('base_url') + '/blog' , Cypress.env('auth'));
	cy.get('[data-cy="Pagination"] > .cursor-pointer').click();
	cy.url().should('contains', Cypress.env('base_url') + '/blog/page/2');
	cy.get('[data-cy="Pagination"] > .cursor-pointer:nth-child(1)').click();
	cy.url().should('contains', Cypress.env('base_url') + '/blog');
	cy.get('[data-cy="Teaser"]:nth-child(1) .cursor-pointer').click()
	  .then ((response) => {
            cy.url(response);
       })	  
  })
  it("checks meta tags exist", () => {
    cy.visit(Cypress.env('base_url') + '/blog' , Cypress.env('auth'));
    cy.document()
      .get('head link[rel="canonical"]')
      .should("exist")
      .and("have.attr", "href", Cypress.env('base_url') + "/blog")
    cy.document()
      .get('head meta[name="title"]')
      .should("exist")
      .and("have.attr", "content", "Databricks Blog")
	cy.document()
      .get('head meta[name="description"]')
      .should("exist")
      .and("have.attr", "content", "Get product updates, Apache Spark best-practices, use cases, and more from the Databricks team.")
	cy.document()
      .get('head meta[property="og:image"]')
      .should("exist")
      .and("have.attr", "content", Cypress.env('base_url') + "/en-blog-assets/static/og-databricks-58419d0d868b05ddb057830066961ebe.png")	
  })
})
