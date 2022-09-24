describe('Trello', () => {

  beforeEach(() => {
    // Reset app data
    cy.request('POST', '/api/reset')
  })

  it('can create a new board', () => {
    // Load the home page
    cy.visit('/')

    // Verify the home page loaded
    cy.get('[data-cy="trello-logo"]').should('be.visible')
    cy.get('[data-cy="login-menu"]').should('be.visible')
    cy.get('[data-cy="first-board"]').should('be.visible')
    cy.get('img[src*="start"]').should('be.visible')
    cy.contains('Get started!').should('be.visible')

    // Create a new board
    cy.get('[data-cy="first-board"]').type('House Chores{enter}')

    // Verify the new board is created
    cy.get('[data-cy="home"]').should('be.visible')
    cy.get('[data-cy="board-title"]').should('have.value', 'House Chores')
    cy.get('[data-cy="add-list-input"]').should('have.length', 1)
    cy.get('[data-cy="list-name"]').should('have.length', 0)
  })
})