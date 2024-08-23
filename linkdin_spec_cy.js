describe('LinkedIn Profile Test', () => {
  before(() => {
    // Visit LinkedIn login page
    cy.visit('https://www.linkedin.com/login');
  });

  it('Login to LinkedIn', () => {
    // Enter the username
    cy.get('input#username').type('pallavikapadnis312000@gmail.com');
    
    // Enter the password
    cy.get('input#password').type('Pallavi@3108');
    
    // Click the login button
    cy.get('button[type="submit"]').click();

    // Check if login is successful by verifying the URL
    cy.url().should('include', '/feed');
  });

  it('Check Premium Status', () => {
    // Visit your profile
    cy.visit('https://www.linkedin.com/in/pallavi-kapadnis-7105262b2');

    // Check if "Try Premium for free" button is visible
    cy.get('button').contains('Try Premium for free').should('be.visible');
    
    // Alternatively, check if the "Premium" badge is present
    cy.get('.premium-badge').should('be.visible');
  });
});
