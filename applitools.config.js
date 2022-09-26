// This config file specifies how to run visual tests with Applitools.
// It applies to all tests in this project.

module.exports = {

  // Concurrency refers to the number of visual checkpoints Applitools will perform in parallel.
  // Warning: If you have a free account, then concurrency will be limited to 1.
  testConcurrency: 1,

  // A batch is the collection of visual checkpoints for a test suite.
  // Batches are displayed in the dashboard, so use meaningful names.
  batchName: 'Tutorial: Visual Testing with Cypress',
}