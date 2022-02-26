describe('ui: LifeCalendar component', () => {
  it('should render the component and active year should be 31', () => {
    cy.visit(
      '/iframe.html?id=lifecalendar--primary&args=age:31&viewMode=story'
    );
    cy.get('[data-active="true"]').should('contain', '31');
  });

  it('should render the component and active year should be 60', () => {
    cy.visit(
      '/iframe.html?id=lifecalendar--primary&args=age:60&viewMode=story'
    );
    cy.get('[data-active="true"]').should('contain', '60');
  });
});
