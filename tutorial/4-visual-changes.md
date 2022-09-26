# Introducing visual changes

Things change.
It's what they do.
Some changes are intended as part of software development,
while others are bugs that ought to be fixed.
In this chapter, we'll learn how to handle both good and bad changes.


## Handling a good change

Take another look at the get started page:

![Step 1: Load the home page](images/chapter1/get-started-page.png)

Let's change the nav bar's color from blue to green.
In the `trelloapp-vue-vite-ts` project,
open the `src/components/Navbar.vue` file,
and find these lines:

```
nav {
  @apply h-10 bg-blue7 grid grid-cols-3 z-10 fixed top-0 w-full;
}
```

Change `bg-blue7` to `bg-green7` like this:

```
nav {
  @apply h-10 bg-green7 grid grid-cols-3 z-10 fixed top-0 w-full;
}
```

Reload the Trello clone app.
You should now see a green nav bar instead of a blue one:

![Get started page with green nav bar](images/chapter4/get-started-green.png)

Switch back to the `visual-testing-with-cypress` project,
and rerun the test (`npx cypress open` or `npx cypress run`).
Open the Applitools Eyes dashboard to see the results:

![Applitools Eyes dashboard: unresolved results](images/chapter4/dashboard-unresolved-results.png)

This time, the results are marked as *Unresolved* in orange!
This is not necessarily a test failure.
It means that we, as human testers, must review the results to determine if it is a failure.
Both checkpoints report differences.
Open up the first one for a side-by-side comparison:

![Applitools Eyes dashboard: comparing color changes](images/chapter4/dashboard-blue-green-comparison.png)

Applitools highlights visual differences in magenta.
The nav bar is highlighted on both the baseline and the checkpoint snapshots.

Since these changes are intentional,
let's accept these new checkpoint snapshots.
Click the thumbs-up button in the top-right corner of the comparison window:

![Applitools Eyes dashboard: thumbs-up](images/chapter4/thumbs-up.png)

Accept the change for the second snapshot as well.
Then, the results will be marked as *Passed*:

![Applitools Eyes dashboard: marking unresolved results as passed](images/chapter4/dashboard-unresolved-to-passed.png)

Any time you accept or reject snapshots,
make sure to save them so future tests can reference them
by clicking the save incon in the upper-right corner:

![Applitools Eyes dashboard: save passing results](images/chapter4/dashboard-save-passed.png)

Now, whenver you run new tests, they will use the snapshot with the green banner as the baseline.
Rerun the test to verify:

![Applitools Eyes dashboard: confirming passing result with new baseline](images/chapter4/dashboard-confirm-passed.png)


## Handling a bad change

TBD
