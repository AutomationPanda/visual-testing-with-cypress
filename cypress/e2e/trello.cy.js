describe('Trello', () => {

  beforeEach(() => {
    // Reset app data
    cy.request('POST', '/api/reset')

    // Open Eyes to start visual testing.
    cy.eyesOpen({
      appName: 'Trello clone',                // The name of the app under test
      testName: Cypress.currentTest.title,    // The name of the test case
    })
  })
  
  it('can create a new board', () => {
    // Load the home page
    cy.visit('/')

    // Verify the home page loaded
    cy.eyesCheckWindow('Get started page');

    // Create a new board
    cy.get('[data-cy="first-board"]').type('House Chores{enter}')

    // Verify the new board is created
    cy.eyesCheckWindow({
      tag: 'New board page',
      target: 'window',
      fully: true
    });

    // Add a new list
    cy.get('[data-cy="add-list-input"]').type('Yardwork{enter}')

    // Add a card to the list
    cy.get('[data-cy="new-card"]').click()
    cy.get('[data-cy="new-card-input"]').type('Mow the lawn{enter}')

    // Verify the new list and card
    cy.eyesCheckWindow('New list and card');

    // Verify the card's due date
    cy.get('[data-cy="due-date"] span')
        .invoke('text')
        .should('match', /[A-Z][a-z]+\s+\d\d?\s+\d{4}/)

    // Open the new card
    cy.get('[data-cy="card"]').click()

    // Add random text
    var uuid = require("uuid")
    var randomId = uuid.v4()
    cy.get('[data-cy="card-description"]').type(randomId + '{enter}')

    // Verify the card edit window
    cy.eyesCheckWindow({
      tag: 'Card edit window',
      target: 'window',
      fully: true,
      matchLevel: 'Layout',
    });
  })
  
  afterEach(() => {
    // Close Eyes to tell the server it should display the results.
    cy.eyesClose()
  })
})