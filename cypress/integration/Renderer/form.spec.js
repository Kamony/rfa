describe('Form Renderer', () => {
  before(() => {
    cy.visit('http://localhost:1234');
    cy.get('.MuiList-root > :nth-child(1)').click();
    cy.get('.MuiList-root > :nth-child(2)').click();
    cy.get('.MuiList-root > :nth-child(3)').click();
    cy.get('.MuiBox-root-17 > .MuiButtonBase-root').click({ force: true });
  });
  // after(() => {
  //   cy.get('[data-cy=action-Delete]').click();
  // });
  it('Shows created form', () => {
    cy.get('#form-group-content').should('be.visible');
  });
  it('Can fill data', () => {
    cy.get(
      '.MuiBox-root-36 > [style="width: 100%;"] > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input'
    )
      .click()
      .clear()
      .type('test input 1');
    cy.get(
      '.MuiBox-root-37 > [style="width: 100%;"] > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input'
    )
      .click()
      .clear()
      .type(1010);
    cy.get(
      ':nth-child(1) > .MuiButtonBase-root > .MuiIconButton-label > .PrivateSwitchBase-input-42'
    ).click();

    cy.get(
      '.MuiBox-root-36 > [style="width: 100%;"] > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input'
    ).should('have.value', 'test input 1');
    cy.get(
      '.MuiBox-root-37 > [style="width: 100%;"] > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input'
    ).should('have.value', '1010');
    cy.get(
      ':nth-child(1) > .MuiButtonBase-root > .MuiIconButton-label > .PrivateSwitchBase-input-42'
    ).should('be.checked');
  });
});
