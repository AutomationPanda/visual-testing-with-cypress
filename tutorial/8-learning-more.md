# Learning more independently

Congratulations!
You have finished the main part of this tutorial.
Now, you know the basics of visual testing with Cypress.
There's still lots more that you can learn and do.
In this bonus chapter, you'll learn about advanced features of Applitools,
and you'll be challenged to automate more tests on your own.


## Advanced Applitools features

Everything in this tutorial is accessible with a free Applitools account.
However, if you have a paid Applitools account,
then you will have access to many advanced features:

* In addition to cross-browser testing in the cloud with the [Ultrafast Grid](https://applitools.com/platform/ultrafast-grid/),
  you can run cross-device testing in the cloud with the [Native Mobile Grid](https://applitools.com/platform/native-mobile-grid/).
* You can create [visual locators](https://applitools.com/blog/why-visual-locators-not-selectors-in-tests/)
  to use in your tests instead of traditional selectors like XPaths and CSS selectors.
* You can use [Contrast Advisor](https://applitools.com/contrast-advisor/)
  to check if your pages conform to WCAG 2.0/2.1 contrast accessibility standards.
* You can create [branches for baselines](https://help.applitools.com/hc/en-us/articles/360007528631-Branches)
  to track snapshots in different development stages.
* You can also use branching to perform visual [A/B testing](https://applitools.com/blog/validating-multiple-variations/).
* If you need to internationalize your apps, you can use visual testing to simplify your
  [localization testing](https://applitools.com/blog/localization-testing/).

Visual testing isn't really a *type* of testing.
Instead, it's a *technique* that enhances testing and automation!


## Breaking apart the test case

In this tutorial, we automated only one test case, but that test covered multiple behaviors.
It could be seen as a "grand tour".
A better practice would be to develop a separate test case for each individual behavior.
Try breaking apart the one test we wrote into separate test cases.


## Adding more tests to the project

There are several other behaviors we could test:

* Adding, deleting, and modifying boards
* Adding, deleting, and modifying lists in a board
* Adding, deleting, and modifying cards in a list
* Creating an account
* Performing login

Try adding tests to cover these behaviors.
Use what you have learned about visual testing with Applitools
to capture meaningful snapshots that verify the right things.