# Tutorial: Visual Testing with Cypress and Applitools

This repository contains a full tutorial for visual testing
with [Cypress](https://www.cypress.io/) and [Applitools](https://applitools.com/).
You can complete this tutorial independently by following the instructions under the [`tutorial`](/tutorial/) folder.


## Abstract

Visuals are the DNA of good User Interfaces (UI) and User Experience (UX).
Traditional UI-based test automation is great for *interactions* like navigating pages and clicking buttons,
but it struggles with *verifications* that reflect what users actually see.

In this tutorial, you will learn how to improve your test coverage while simplifying your test code with visual testing techniques.
We will use [Cypress](https://www.cypress.io/) to automate tests against a Trello-like web app,
and we will incorporate [Applitools](https://applitools.com/) for visual testing.
The tutorial will cover how to add visual assertions to tests,
how to handle test results,
and how to modernize cross-browser testing.


## Outline

This tutorial has eight chapter:

1. Setting up the app under test
2. Automating our first Cypress test
3. Rewriting our test with visual assertions
4. Introducing visual changes
5. Testing different browsers
6. Applying different matching techniques
7. Checking specific elements
8. Learning more independently


## Instructions

This tutorial is designed so that you can complete it on your own.
Instructions for each chapter are located under the [`tutorial`](/tutorial/) folder.
Each chapter guide will provide explanations with example code.
As you follow each chapter, you will iteratively build your own test project using Cypress and Applitools.
It is recommended to build that project as a separate project from this repository.
Use this repository for instructions and examples.

Furthermore, each chapter has a corresponding branch in this repository.
Each chapter branch represents the expected state of the test project for its chapter.
You can reference the example code in each branch to make sure the project you are building is correct at every step.
The `main` branch represents the final state for the project and includes the full set of instructions.


## Prerequisites

To start this tutorial, you need:

* [Node.js](https://nodejs.org/), version 16 or higher
* [Visual Studio Code](https://code.visualstudio.com/docs/languages/javascript) or a similar editor
* a [free Applitools account](https://auth.applitools.com/users/register)

You should also have basic skills with JavaScript and Cypress.
You don't need to be an expert, but if you are new to them,
then it is recommended to take the following TAU courses before attempting this tutorial:

* [Introduction to JavaScript](https://testautomationu.applitools.com/javascript-tutorial/)
* [Introduction to Cypress](https://testautomationu.applitools.com/cypress-tutorial/)
* [Advanced Cypress](https://testautomationu.applitools.com/advanced-cypress-tutorial/)


## Acknowledgements

Many thanks to [Filip Hric](https://twitter.com/filip_hric) for allowing me to use
his [Trello clone](https://github.com/filiphric/trelloapp-vue-vite-ts) app in this tutorial!
