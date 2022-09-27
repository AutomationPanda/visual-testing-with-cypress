# Introducing visual changes

Things change.
It's what they do.
Some changes are intended as part of software development,
while others are bugs that ought to be fixed.
In this chapter, we'll learn how to handle both good and bad changes.


## Resetting app data

As we make changes to our Trello clone app, we will need to reset app data manually.
All data is stored in the `trelloapp-vue-vite-ts` project in the `backend/data/database.json`.
To reset data, simply replace all file contents with the following JSON:

```json
{
  "boards": [],
  "cards": [],
  "lists": [],
  "users": []
}
```

You can also manually inject data into the app through this file!


## Accepting a good change

Take another look at the get started page:

![Get started page](images/chapter1/get-started-page.png)

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

Reset the app data, and reload the app in the browser.
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

![Applitools Eyes dashboard: thumbs-up](images/chapter4/dashboard-thumbs-up.png)

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


## Discovering a bad change

With web frontends as complicated as they are these days,
it's all too easy to make a mistake.
Many times, visual bugs happen when we tweak layouts and styling.
Let's deliberately break the layout on the get started page.

In the `trelloapp-vue-vite-ts` project,
open the `src/components/Emptylist.vue` file,
and find these lines:

```html
<h1 class="mb-8 text-3xl font-bold">
  Get started!
</h1>
<p>Go ahead and create your first board!</p>
```

And change them to this:

```html
<div style="position: relative">
  <h1 class="text-3xl font-bold">
    Get started!
  </h1>
  <div style="position: absolute; top: 0; width: 100%">
    <p>Go ahead and create your first board!</p>
  </div>
</div>
```

The text will be the same, but the layout will make them overlap.
Reset the app data and reload the home page.
It should look like this:

![Get started page with overlapping text](images/chapter4/get-started-overlap.png)

That's clearly a visual bug!
Switch back to the `visual-testing-with-cypress` project,
rerun the test,
and check the results in the Applitools Eyes dashbard:

![Applitools Eyes dashboard: unresolved results for visual bug](images/chapter4/dashboard-unresolved-bug.png)

This time, the get started page has differences, while the new board page is unchanged.
Open the get started snapshot comparison window to see the differences:

![Applitools Eyes dashboard: comparing text overlap pages](images/chapter4/dashboard-overlap-comparison.png)


## Analyzing the bug

It's clear to see that the text in the left column is different.
To see a clearer analysis of the differences,
click the button to hide differences caused by element displacement:

![Applitools Eyes dashboard: hide differences caused by element displacement](images/chapter4/dashboard-element-displacement.png)

With this adjustment, Applitools Visual AI pinpoints the elements that actually changed:
the two text fields.
The input field for the new board name is no longer highlighted because it didn't change.
It merely shifted due to changes in other elements.

Let's do root cause analysis to understand the nature of the change.
In the toolbar under *View*, click "Root cause analysis".
To find differences in the page, click on the magenta regions in the snapshots.
For example, click the "Go ahead and create your first board!" text in the baseline snapshot.
The left sidebar will reveal the changes to the HTML and CSS:

![Applitools Eyes dashboard: root cause analysis](images/chapter4/dashboard-rca.png)

The original element was a `p`, but it changed to a `div`.
Moreover, the new `div` gained new styling: `style: position:relative`.
Those changes are exactly what caused the visual bugs –
and exactly the code we injected to break the app.

Let's mark the bug we found.
Close the root cause analysis view.
In the toolbar under *Annotations*,
pick the circle with the exclamation point to add a bug region.
Set a bug region over the big in the checkpoint snapshot.
Name the bug "Overlapping text":

![Applitools Eyes dashboard: bug region](images/chapter4/dashboard-bug-region.png)

Click the *Create* button, and the snapshot will have the bug region!
Folks can come back and add comments to this bug region, too.

Our analysis is complete.
Reject the new snapshot by clicking thumbs-down:

![Applitools Eyes dashboard: thumbs-down](images/chapter4/dashboard-thumbs-down.png)

Close the comparison window, and save the changes.
The test should now appear as failed:

![Applitools Eyes dashboard: first failed test](images/chapter4/dashboard-failed-first.png)

Rerun the test again without changing the Trello clone app.
This time, it should fail automatically without any extra analysis.
Applitools will recognize that the checkpoint is the same as the previous failure:

![Applitools Eyes dashboard: second failed test](images/chapter4/dashboard-failed-second.png)

Finally, let's fix this visual bug.
Undo the changes in the `trelloapp-vue-vite-ts` project to the `src/components/Emptylist.vue` file.
Revert this:

```html
<div style="position: relative">
  <h1 class="text-3xl font-bold">
    Get started!
  </h1>
  <div style="position: absolute; top: 0; width: 100%">
    <p>Go ahead and create your first board!</p>
  </div>
</div>
```

To this:

```html
<h1 class="mb-8 text-3xl font-bold">
  Get started!
</h1>
<p>Go ahead and create your first board!</p>
```

Relaunch the app, and rerun the Cypress test.
It should pass again:

![Applitools Eyes dashboard: failure fixed](images/chapter4/dashboard-failure-fixed.png)

Since the bug is now fixed, we should remove the bug region.
Open the comparison window for the get started snapshot,
click on the bug region,
and then delete it:

![Applitools Eyes dashboard: delete bug region](images/chapter4/dashboard-delete-bug.png)

Save the changes.
The app is now back on track!