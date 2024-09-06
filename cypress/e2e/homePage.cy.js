describe('HomePage View Unit Test', () => {
  it('should render the HomePage component correctly', () => {
    cy.visit('localhost:3000/'); // Assuming the HomePage component is rendered at the root route '/'

    // Check for specific elements and content in the HomePage component
    cy.get('.hero-h1').should('contain', 'Supporting Projects & Realizing Kindness.');
    cy.contains('Empowering Employee Volunteering.').should('be.visible');
    cy.contains('Get Started').should('have.attr', 'href', '/login');

    cy.get('.stats-title').should('contain', 'We Have Helped Communities Thrive');
    cy.contains('$120M').should('be.visible');
    cy.contains('Funds raised for community projects').should('be.visible');

    cy.get('.testimonial-section').should('exist');
    cy.get('.goals-h2').should('contain', 'Our Goals');

    // You can add more assertions as needed to test other elements in the component
  });
});


describe('HomePage', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/'); // Update the URL to match the Home page URL
    });
  
    it('Should display the hero section with correct title and lead text', () => {
      cy.get('.hero-section').should('be.visible');
      cy.get('.hero-content h1').should('contain', 'Supporting Projects & Realizing Kindness.');
      cy.get('.hero-content p.lead').should('contain', 'Empowering Employee Volunteering.');
      cy.get('.hero-content a.btn').should('contain', 'Get Started');
    });
  
    it('Should display the statistics section with correct statistics', () => {
      cy.get('.stats-section').should('be.visible');
      cy.get('.stats-title').should('contain', 'We Have Helped Communities Thrive');
      cy.get('.col-md-3').should('have.length', 10); // Check the total number of statistics
      // Add assertions to check each statistic value and description
    });
  
    it('Should display the testimonial section with correct testimonials', () => {
      cy.get('.testimonial-section').should('be.visible');
      cy.get('.testimonial-content').should('have.length', 2); // Check the total number of testimonials
      // Add assertions to check each testimonial content, author, and role
    });
  
    it('Should display the goals section with correct goals', () => {
      cy.get('.goals-section').should('be.visible');
      cy.get('.goals-section h2').should('contain', 'Our Goals');
      cy.get('.col-md-4').should('have.length', 4); // Check the total number of goals
      // Add assertions to check each goal title and description
    });
  });