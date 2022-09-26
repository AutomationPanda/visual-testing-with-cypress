# Chapter 1: Setting up the app under test

Before we can automate any Cypress tests, we need a web app to test!
In this chapter, you will set up and run a Trello-like app on your local machine.


## Installing Node.js

[Node.js](https://nodejs.org/) is a JavaScript runtime.
You will need version 16 or higher for completing this tutorial.
You can check if you already have it installed using this command:

```
node --version
```

If the command fails or your version is too low,
you can [download the latest version](https://nodejs.org/en/download/) from the Node.js website.


## Installing the Trello-like app

The app we will test is a simplified [Trello clone](https://github.com/filiphric/trelloapp-vue-vite-ts)
developed by [Filip Hric](https://twitter.com/filip_hric).
In this app, users can:

* create an account and then login
* create task boards
* add columns to a board
* add tasks to a column
* move tasks between columns

To install the app, clone its repository:

```
git clone https://github.com/filiphric/trelloapp-vue-vite-ts.git
```

*Note:*
If you do not have a Git client,
you can [download the app's code](https://github.com/filiphric/trelloapp-vue-vite-ts/archive/refs/heads/main.zip) as a ZIP instead.

Then, enter the project directory and install the dependencies:

```
cd trelloapp-vue-vite-ts
npm install
```


## Running the Trello-like app

To launch the app, run:

```
npm start
```

If successful, you should see output similar to this:

```
> trelloapp-vue-vite-ts@1.0.0 start
> vite

vite:istanbul> Sourcemaps was automatically enabled for code coverage to be accurate.
 To hide this message set build.sourcemap to true, 'inline' or 'hidden'.

  vite v2.9.12 dev server running at:

  > Local: http://localhost:3000/
  > Network: use `--host` to expose

  ready in 347ms.
```

Then, you can open a web browser and load the app at [http://localhost:3000/](http://localhost:3000/).
The home page should look like this:

![Get Started page](images/chapter1/get-started-page.png)

Keep the app running in its own terminal throughout the tutorial.


## Running the app's existing Cypress tests

The Trello clone app already has a suite of Cypress tests.
Let's run those tests to make sure everything is set up correctly.
In a different terminal, change directory into the repository and run:

```
npx cypress run
```

Let the tests run for a few minutes.
All specs should pass.

Take a few extra minutes to review the Cypress tests.
They are located under the `cypress/e2e` folder.
The tests we will write in this tutorial will be similar.
