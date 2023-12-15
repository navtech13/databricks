describe("Test Resource post overview", () => {
  it("'confirms page loaded", () => {
	cy.visit(Cypress.env('base_url') + '/resources/ebook/data-lakehouse-is-your-next-data-warehouse' , Cypress.env('auth'));
	cy.wait(1000);
  })
  it("does NOT allow an invalid email address", () => {
	  cy.visit(Cypress.env('base_url') + '/resources/ebook/data-lakehouse-is-your-next-data-warehouse' , Cypress.env('auth'));
	  cy.wait(1000);
	  cy.get('#FirstName').type('test');
	  cy.get('#LastName').type('test');
	  cy.get('#Email').type('test');
	  cy.get('#Company').type('test');
	  cy.get('#Title').type('test');
	  cy.get('#Phone').type('1234567890');  
	  cy.get('#Country').select('Algeria');  
	  cy.get('button[type="submit"]').click();
	  cy.get("#ValidMsgEmail").contains('Must be valid email.');
  })
   it('should submit form successfully and check asset on thank you page', () => {
	cy.visit(Cypress.env('base_url') + '/resources/ebook/data-lakehouse-is-your-next-data-warehouse' , Cypress.env('auth'));
	cy.wait(1000);
    cy.get('#FirstName').type('test');
	cy.get('#LastName').type('test');
    cy.get('#Email').type('test@gmail.com');
	cy.get('#Company').type('test');
	cy.get('#Title').type('test');
	cy.get('#Phone').type('1234567890');  
	cy.get('#Country').select('Algeria');  
    cy.get('button[type="submit"]').click();
	cy.wait(5000);
	cy.document().then((doc) => {
	const newurl = doc.querySelector('[data-cy="TYPageContent"] [data-cy="Button"]').getAttribute('href');
	cy.request({
        url: newurl,
		encoding: 'base64'
      })
        .then((response) => {
          expect(response.status).to.equal(200);
        });
	});
  })

  
 })
