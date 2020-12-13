describe('Form element manipulation', () => {
  before(() => {
    cy.visit('http://localhost:1234');
  });
  it('can add element to editor', () => {
    cy.get('.MuiList-root > :nth-child(1)').click();
    cy.get('[draggable="true"] > .MuiPaper-root')
      .should('be.visible')
      .and('have.length', 1);
  });
  it('can remove element from editor', () => {
    cy.get('[draggable="true"] > .MuiPaper-root').should('be.visible');
    cy.get('[data-cy=action-Delete]').click();
    cy.get('.MuiList-root > :nth-child(1)').click();
    cy.get('[draggable="true"] > .MuiPaper-root')
      .should('be.visible')
      .and('have.length', 1);
  });
  it('can duplicate element', () => {
    cy.get('[draggable="true"] > .MuiPaper-root').should('be.visible');
    cy.get('[draggable="true"] > .MuiPaper-root').should('have.length', 1);
    cy.get('[data-cy=action-Copy]').click();
    cy.get('[draggable="true"] > .MuiPaper-root').should('have.length', 2);
  });
});
