describe('Form Renderer', () => {
  before(() => {
    cy.visit('http://localhost:1234');
  });
  it('can add tree element', () => {
    cy.get('.MuiList-root > :nth-child(9)').click();
    cy.get('.makeStyles-root-28 > .MuiPaper-root').should('be.visible');
  });
  it('can edit tree element', () => {
    cy.get('.makeStyles-root-28 > .MuiPaper-root').should('be.visible');
    cy.get('[data-cy=action-Edit]').click();

    cy.get(
      ':nth-child(2) > [style="width: 100%;"] > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input'
    )
      .click()
      .clear()
      .type('nodeTitleTest');
    cy.get(
      ':nth-child(3) > [style="width: 100%;"] > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input'
    )
      .click()
      .clear()
      .type('nodePlaceholderTest');

    cy.get(
      ':nth-child(4) > .makeStyles-container-64 > :nth-child(4) > .MuiInputBase-root > .MuiInputBase-input'
    )
      .click()
      .clear()
      .type('nodeContentTest');
    cy.get('.MuiBox-root-74 > .MuiButtonBase-root').click();
    cy.get('[data-cy=button-close-modal]').click();
  });
  it('renders tree element inside form', () => {
    cy.get('.MuiBox-root-17 > .MuiButtonBase-root').click({ force: true });
    cy.get('.makeStyles-root-84 > .MuiPaper-root').should('be.visible');
  });
  it('can fill values', () => {
    cy.get(
      '#form-element > [style="border: 1px solid transparent;"] > [style="padding-left: 0px;"] > :nth-child(2) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input'
    )
      .click()
      .type('testNode1');
  });
  it('can add nodes', () => {
    cy.get('.makeStyles-button-96 > .MuiSvgIcon-root').click();
    cy.get(
      ':nth-child(3) > :nth-child(1) > :nth-child(1) > .makeStyles-root-84 > .MuiPaper-root'
    ).should('be.visible');
  });
  it('can fill values', () => {
    cy.get(
      ':nth-child(3) > :nth-child(1) > :nth-child(1) > .makeStyles-root-84 > .MuiPaper-root > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input'
    )
      .click()
      .type('testNode2');
  });
  it('renders Tree component', () => {
    cy.get('form > .MuiButtonBase-root').click({ force: true });
    cy.get(':nth-child(5) > .MuiContainer-root').should('be.visible');
  });
  it('can search for node', () => {
    cy.get('.makeStyles-root-113 > .MuiInputBase-root > .MuiInputBase-input')
      .click()
      .type('testNode2');
    cy.get('.makeStyles-root-113 > [type="submit"]').click();
    cy.get('.MuiTypography-h6').should('have.text', 'testNode2');
  });
  it('can erase query and reset results', () => {
    cy.get('[aria-label="clear"]').click();
    cy.get('.MuiBox-root-126 > .MuiTypography-h6').should(
      'have.text',
      'testNode1'
    );
  });
});
