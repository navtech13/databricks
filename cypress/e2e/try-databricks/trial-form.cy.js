describe('Form submit', () => {
	it("'confirms page loaded", () => {
	  cy.visit(Cypress.env('base_url') +'/try-databricks', Cypress.env('auth'));
	  cy.wait(1000);
	})
	it("does NOT allow an invalid email address and phone number", () => {
	  cy.visit(Cypress.env('base_url') +'/try-databricks', Cypress.env('auth'));
	  cy.wait(1000);
	  cy.get('#free-trial-form_firstName').type('test');
	  cy.get('#free-trial-form_lastName').type('test');
	  cy.get("#free-trial-form_email").type("test");
	  cy.get('#free-trial-form_company').type('test');
	  cy.get('#free-trial-form_title').type('test');
	  cy.get('#free-trial-form_phone').type('123');
	  cy.get('#free-trial-form_country').click();
	  cy.get('#react-select-2-option-3').click();
	  cy.get("#submit").click()
	  cy.get("label[for='free-trial-form_email']").contains('Please enter a valid email address');
	  cy.get("label[for='free-trial-form_phone']").contains('Please enter a valid phone number');
  })
  it('should type valid form values and should submit form successfully and choose Azure as cloud provider', () => {
    cy.visit(Cypress.env('base_url') +'/try-databricks', Cypress.env('auth'));
	cy.wait(1000);
	cy.get('#free-trial-form_firstName').type('test');
	cy.get('#free-trial-form_lastName').type('test');
	cy.get('#free-trial-form_email').type('test@gmail.com');
	cy.get('#free-trial-form_company').type('test');
	cy.get('#free-trial-form_title').type('test');
	cy.get('#free-trial-form_phone').type('1234567890');
	cy.get('#free-trial-form_country').click();
	cy.get('#react-select-2-option-3').click();
	cy.get("#submit").click();
	cy.get('button > label[for="free-trial-form_cloud-AZURE"]').click();
	cy.get("#free-trial").submit();
  })
  it('should type valid form values and should submit form successfully and choose AWS as cloud provider', () => {
    cy.visit(Cypress.env('base_url') +'/try-databricks', Cypress.env('auth'));
	cy.wait(1000);
	cy.get('#free-trial-form_firstName').type('test');
	cy.get('#free-trial-form_lastName').type('test');
	cy.get('#free-trial-form_email').type('test@gmail.com');
	cy.get('#free-trial-form_company').type('test');
	cy.get('#free-trial-form_title').type('test');
	cy.get('#free-trial-form_phone').type('1234567890');
	cy.get('#free-trial-form_country').click();
	cy.get('#react-select-2-option-3').click();
	cy.get("#submit").click();
	cy.get('button > label[for="free-trial-form_cloud-AWS"]').click();
	cy.get("#free-trial").submit();
  })
  it('should type valid form values and should submit form successfully and choose GCP as cloud provider', () => {
    cy.visit(Cypress.env('base_url') +'/try-databricks', Cypress.env('auth'));
	cy.wait(1000);
	cy.get('#free-trial-form_firstName').type('test');
	cy.get('#free-trial-form_lastName').type('test');
	cy.get('#free-trial-form_email').type('test@gmail.com');
	cy.get('#free-trial-form_company').type('test');
	cy.get('#free-trial-form_title').type('test');
	cy.get('#free-trial-form_phone').type('1234567890');
	cy.get('#free-trial-form_country').click();
	cy.get('#react-select-2-option-3').click();
	cy.get("#submit").click();
	cy.get('button > label[for="free-trial-form_cloud-GCP"]').click();
	cy.get("#free-trial").submit();
  })
})

