/**
 * Helper functions to interact with the json file
 * passing argunments to prettyprint json.
 */

const fs = require('fs');
const jsonschema = require('jsonschema');

const ExpressError = require('../errors/expressError');

const writeJsonToFile = (path, data) => {
  fs.writeFileSync(path, JSON.stringify(data, null, 2), error => {
    throw new ExpressError(error, 500);
  });
};

const validateJson = (json, schema) => {
  const result = jsonschema.validate(json, schema);
  if (!result.valid) {
    const listOfErrors = result.errors.map(error => error.stack);
    throw new ExpressError(listOfErrors, 400);
  }
};

module.exports = {
  write: writeJsonToFile,
  validate: validateJson,
};
