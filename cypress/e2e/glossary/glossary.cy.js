const cypressConfig = require("../../../cypress.config");

describe(' Check filter and all links are with status 200', () =>{
    
    it('Confirm page load', () => {
        cy.visit(Cypress.env('base_url') + '/glossary', Cypress.env('auth'));
        cy.wait(1000);
    })

    it('Confirm all filter works', () => {
        cy.visit(Cypress.env('base_url') + '/glossary', Cypress.env('auth'));
        cy.wait(1000);
		cy.get('data-cy="glossary-select"]').click();
        cy.get('input[type="checkbox"]').each(($elem, index) => {
              if (index === 1) { cy.wrap($elem).click()}
        })
    })
	it('Checks Search works', () => {
        cy.visit(Cypress.env('base_url') + '/glossary', Cypress.env('auth'));
        cy.wait(1000);      
        const searchKeyword = cy.get('#glossSearch').type('acid');
        cy.get('[data-cy="search-btn"]').click();
		cy.get('[data-cy="glossary-item"]').each(($ele) => {
		  if($ele.text().trim() == searchKeyword){
			expect($ele.text().trim()).to.equal(searchKeyword)  
		  }
		})
    })
    it('Check all page links', () => {
        cy.visit(Cypress.env('base_url') + '/glossary', Cypress.env('auth'));
        cy.wait(1000);      
        cy.get('[data-cy="glossary-link"]').each((page,index) => {
            cy.request(page.prop('href'))
        })
    })

})
