describe('Application Navigation', () => {
  it('should load the application, navigate to a user detail, and go back', () => {
    cy.visit('http://localhost:4200');

    cy.get('section ul li a').first().click(); 

    cy.get('.back-button').should('exist');

    cy.get('.back-button').click();

    cy.get('section ul li a').should('exist');
  });
});
