# Applying different match levels

Image matching is at the heart of Visual AI.
In most cases, the default or "strict" matching is good enough for tests,
but sometimes, we need to tune.
In this chapter, we will learn when and how to adjust the match level.


## Extending the test

Let's take our test further.
After creating a new board, let's create a new list and a new card.
Open `cypress/e2e/trello.cy.js`,
and add the following lines to the bottom of the `it('can create a new board'` test:

```javascript
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
```

These are typical Cypress calls with basic Applitools Eyes snapshots.
At the end of the test, the board should now look like this:

![Trello board with a list and a card](images/chapter5/board-with-list-and-card.png)

Run the updated test (`npx cypress run`) and check the Applitools Eyes dashboard.
Since this test now has two new snapshots, its result should be *Unresolved*:

![Applitools Eyes dashboard: new snapshots are unresolved](images/chapter5/dashboard-new-snapshots-unresolved.png)

Accept both new snapshots, and save the updates:

![Accepting the new snapshots for the test](images/chapter5/accept-new-snapshots.png)

Great! Now our test covers more behavior.


## Ignoring a region

At first glance, our new snapshots look great.
Unfortunately, there's a problem lurking on the new card it adds – the date:

![Trello card date](images/chapter5/card-date.png)

Whenever a new card is created, its due date is automatically set to two days in the future.
So, if I run this test on Sep 27, 2022, then the due date for this card will be Sep 29, 2022.
If I run this test a day later, then the due date will be different.
That means our baseline and checkpoint images will not match!

Thankfully, there's an easy fix:
we can set an [ignore region](https://help.applitools.com/hc/en-us/articles/360006915192-Adding-Ignorable-Regions)
over that date field.
Then, whenever this test runs again,
Applitools Visual AI will ignore any changes in that region.

Open the "New list and card" snapshot in the Applitools Eyes dashboard.
In the toolbar under *Annotations*,
click the "Ignore" button with the square icon,
and then draw a region box over the date field:

![Adding an ignore region to a snapshot](images/chapter5/ignore-region.png)

Close the comparison window, and save the changes.
Now, whenever you run a test, this region will be excluded from visual comparisons.
The test shouldn't fail depending on the date!


## Selecting match levels

