describe('Form element manipulation', () => {
  before(() => {
    cy.visit('http://localhost:1234');
    cy.get('.MuiList-root > :nth-child(1)').click();
  });
  beforeEach(() => {});
  after(() => {
    cy.get('[data-cy=action-Delete]').click();
  });
  it('shows attributes editor', () => {
    cy.get('[data-cy=action-Edit]').click();
    cy.get('.MuiDialog-container').should('be.visible');
  });
  it('can edit text label', () => {
    cy.get(
      '.makeStyles-attributes-31 > :nth-child(1) > [style="width: 100%;"] > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input'
    )
      .click()
      .clear()
      .type('test');
    cy.get('.MuiBox-root-28 > form > .MuiBox-root > .MuiButtonBase-root')
      .should('be.visible')
      .click();
    cy.get('[data-cy=button-close-modal]').click();
    cy.get('.MuiFormLabel-root').should('have.text', 'test');
  });
});
