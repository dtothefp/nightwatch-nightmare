'use strict';

const path = require('path');
const nightwatch = require('nightwatch');

const originalArgv = JSON.parse(process.argv[2]);
const argv = {};

for (let key in originalArgv) {
  if (key === 'env' && argv['parallel-mode'] === true) {
    continue;
  }
  argv[key] = originalArgv[key];
}

if (argv.test) {
  argv.test = path.resolve(argv.test);
}

nightwatch.runner(argv, function(success) {
  console.log('**********CHILD DONE***********', success);
  if (!success) {
    process.exit(1);
  } else {
    process.exit(0);
  }
});
