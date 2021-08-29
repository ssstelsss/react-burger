describe('dnd', function () {
  before(function () {
    cy.visit('http://localhost:3000')
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(5000)
  })

  it('dnd work correct', function () {
    cy.get('div[id="drug"]').first().trigger('dragstart')

    cy.get('div[id="drop"]').trigger('dragenter').trigger('drop')

    cy.get('.constructor-element').should('be.exist')
  })
})
