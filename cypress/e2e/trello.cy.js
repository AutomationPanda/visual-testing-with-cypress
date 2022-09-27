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

    // Open the new card
    cy.get('[data-cy="card"]').click()

    // Verify the card edit window
    cy.eyesCheckWindow('Card edit window');
  })
  
  afterEach(() => {
    // Close Eyes to tell the server it should display the results.
    cy.eyesClose()
  })
})