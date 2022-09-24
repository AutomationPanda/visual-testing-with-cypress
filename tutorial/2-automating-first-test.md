# Automating our first Cypress test

Now that we have our Trello clone app installed, let's start testing it!
In this chapter, we will automate a "traditional" UI test with Cypress.
We will enhance it in the next chapter with visual assertions.


## Creating a new test project

For this tutorial, we will create a new, separate project for our Cypress tests.
This project must be *separate* from the Trello clone app's repository.

Create a new project folder:

```
mkdir visual-testing-with-cypress
cd visual-testing-with-cypress
```

Set up the project with a `package.json` file by running:

```
npm init
```

Answer the prompts as you see fit.
You can take default values.

To install Cypress, run:

```
npm install -D cypress
```

*Note:*
The example code in this project uses Cypress 10.8.0.
Later versions of Cypress should work,
but some of the fine details might be differe.

Next, we need to set up the Cypress project files.
The easiest way to do this is through the Cypress window.
Run the following command to get started:

```
npx cypress open
```

When the Cypress window opens, chose "E2E Testing":

![Cypress Window: Welcome](images/cypress-welcome.png)

Then, Cypress will generate a set of folders and files for running tests.
Accept them by clicking "Continue":

![Cypress Window: Configuration Files](images/cypress-config-files.png)

The next screen will prompt you for a browser to use for testing.
Pick whichever one you like:

![Cypress Window: Choose a Browser](images/cypress-choose-browser.png)

The following screen will invite you create your first spec.
Choose "Create new empty spec":

![Cypress Window: Create your first spec](images/cypress-create-first-spec.png)

Set the name of the new file to `cypress/e2e/trello.cy.js`:

![Cypress Window: New spec](images/cypress-new-spec.png)

When prompted, choose to run your new spec.
The only thing the new test does is load the [Cypress example page](https://example.cypress.io).
The test should pass:

![Cypress Window: Cypress Kitchen Sink](images/cypress-kitchen-sink.png)

At this point, close the window.
The Cypress project should be all set up!
Your project directory should look like this:

```
visual-testing-with-cypress
├── cypress
│   ├── e2e
│   │   └── trello.cy.js
│   ├── fixtures
│   │   └── example.json
│   └── support
│       ├── commands.js
│       └── e2e.js
├── cypress.config.js
├── package-lock.json
└── package.json
```


## Formulating our test

Our first test will be short and sweet: we will test the creation of a new board for organizing tasks.

Step #1 is to load the home page:

![Step 1: Load the home page](images/get-started-page.png)

Step #2 is to verify that the home page loaded correctly.
We can't check *everything* on this page, but we can make sure that key elements appear:

* the app title
* the login button
* the input field for the board name
* the artful image
* the "Get Started!" message

![Step 2: Verify the home page loaded](images/get-started-checks.png)

Step #3 is to create a new board.
Let's call this board "House Chores".
Type this name into the input field and hit ENTER:

![Step 3: Create a new board](images/get-started-new-board.png)

Finally, Step #4 is to verify that the new board is created correctly.
Again, we can't check everything, but we should verify the following:

* the title bar has the home button
* the board name is "House Chores"
* there is one column with an input for a new list

![Step 4: Verify the new board is created](images/new-board-checks.png)

Try running these steps manually to become familiar with the app behaviors.


## Automating test steps

Since the app under test is running on your local machine,
we can set its base URL in the Cypress configuration so that the automation code can use shorter resource paths.
Open `cypress.config.js` and add the following `baseUrl` setting:

```javascript
module.exports = defineConfig({
  e2e: {
    // ...
    baseUrl: 'http://localhost:3000',
    // ...
  },
});
```

Now, let's write the automation code.
Open the `cypress/e2e/trello.cy.js` file, and delete all its content.
Replace it with the following test stub:

```javascript
describe('Trello', () => {

  beforeEach(() => {
    // Reset app data
  })

  it('can create a new board', () => {
    // Load the home page
    // Verify the home page loaded
    // Create a new board
    // Verify the new board is created
  })
})
```

Before each test, we need to reset the app data.
Anything one test creates or deletes should not affect other tests.
There are many different strategies for managing test data,
but for this tutorial, we will start each test with a "blank slate" – with no data in the system.
Add the following code to the `beforeEach` method:

```javascript
  beforeEach(() => {
    // Reset app data
    cy.request('POST', '/api/reset')
  })
```

*Note:*
If you want to learn more about test data management strategies, watch this talk on YouTube:
[Managing the Test Data Nightmare](https://www.youtube.com/watch?v=6DQhfjq_HSI)
by [Andrew Knight](https://twitter.com/AutomationPanda).

We will add test case steps inside the `it('can create a new board'` test function.
For step 1, add the following code to load the home page:

```javascript
    // Load the home page
    cy.visit('/')
```

Since the Cypress config has the base URL, we only need `'/'` to navigate to the app's home page.

Step 2 must verify that 5 key elements appear on the home page.
Add the following code: 

```javascript
    // Verify the home page loaded
    cy.get('[data-cy="trello-logo"]').should('be.visible')
    cy.get('[data-cy="login-menu"]').should('be.visible')
    cy.get('[data-cy="first-board"]').should('be.visible')
    cy.get('img[src*="start"]').should('be.visible')
    cy.contains('Get started!').should('be.visible')
```

These calls merely verify that these elements appear somewhere on the page.
The last line verifies the text of that element, too.

Step 3 creates a new board by locating the input field, typing the board name, and hitting the ENTER key.
Add the following code:

```javascript
    // Create a new board
    cy.get('[data-cy="first-board"]').type('House Chores{enter}')
```

Step 4 performs more verifications.
Not only should it verify that home button, board title, and list input appear,
but since the board is new, it must also make sure that no other lists appear.
Add the following code to finish the test:

```javascript
    // Verify the new board is created
    cy.get('[data-cy="home"]').should('be.visible')
    cy.get('[data-cy="board-title"]').should('have.value', 'House Chores')
    cy.get('[data-cy="add-list-input"]').should('have.length', 1)
    cy.get('[data-cy="list-name"]').should('have.length', 0)
```

The full code for `trello.cy.js` should look like this:

```javascript
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
```

*Note:*
If you want to learn more about Cypress,
it is recommended to take the following Test Automation University courses:

* [Introduction to Cypress](https://testautomationu.applitools.com/cypress-tutorial/)
* [Advanced Cypress](https://testautomationu.applitools.com/advanced-cypress-tutorial/)


## Running the test

TBD
