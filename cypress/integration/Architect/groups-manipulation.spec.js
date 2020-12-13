describe('Form element manipulation', () => {
  before(() => {
    cy.visit('http://localhost:1234');
    cy.get('.MuiList-root > :nth-child(1)').click();
  });
  // after(() => {
  //   cy.get('[data-cy=action-Delete]').click();
  // });
  it('shows default group', () => {
    cy.get('[draggable="true"] > .MuiButtonBase-root').should('be.visible');
  });
  it('can add another group', () => {
    cy.get('.MuiButtonGroup-root > :nth-child(1)').should('be.visible').click();
    cy.get(
      '.MuiTabs-flexContainer > :nth-child(2) > .MuiButtonBase-root'
    ).should('be.visible');
  });
  it('can rename group', () => {
    cy.get('.MuiButtonGroup-root > :nth-child(2)').should('be.visible').click();
    cy.get('#name').click().clear().type('test');
    cy.get('.MuiDialogActions-root > :nth-child(2)').click();
    cy.get(
      ':nth-child(2) > .MuiButtonBase-root > .MuiTab-wrapper > .MuiBox-root > .MuiTypography-body1'
    ).should('have.text', 'test');
  });
  it('can delete group', () => {
    cy.get('.MuiButtonGroup-root > :nth-child(3)').should('be.visible').click();
    cy.get('.MuiDialog-container').should('be.visible');
    cy.get('.MuiDialogActions-root > :nth-child(2)').click();
    cy.get('[draggable="true"] > .MuiPaper-root').should('be.visible');
  });
});
