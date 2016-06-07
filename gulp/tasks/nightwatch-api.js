import path from 'path';
import nightwatch from 'nightwatch';
import merge from 'lodash/merge';
import isFunction from 'lodash/isFunction';
import selenium from '../util/selenium';

/*
  --config, -c     Path to configuration file                                                                  [required]  [default: "./nightwatch.json"]
  --output, -o     Where to save the (JUnit XML) test reports.                                                 [default: "tests_output"]
  --reporter, -r   Name of a predefined reporter (e.g. junit) or path to a custom reporter file to use.        [default: "junit"]
  --env, -e        Testing environment to use.                                                                 [default: "default"]
  --verbose        Turns on selenium command logging during the session.
  --test, -t       Runs a single test.
  --testcase       Used only together with --test. Runs the specified testcase from the current suite/module.
  --group, -g      Runs a group of tests (i.e. a folder)
  --skipgroup, -s  Skips one or several (comma separated) group of tests.
  --filter, -f     Specify a filter (glob expression) as the file name format to use when loading the files.   [string]  [default: ""]
  --tag, -a        Only run tests with the given tag.                                                          [default: ""]
  --skiptags       Skips tests that have the specified tag or tags (comma separated).
  --retries        Retries failed or errored testcases up <n> times.
  --suiteRetries   Retries failed or errored testsuites up <n> times.
  --help, -h       Shows this help.
  --version, -v    Shows version information.
*/

//don't pass --env with --parallel-mode
export default function(gulp, plugins, config, opts) {
  const {environment, parallel} = config;
  const {isDev} = environment;
  const args = {
    config: path.resolve(
      __dirname, '..',
      'config',
      isDev ? 'nightwatch' : 'nightwatch-browserstack'
    )
  };

  if (parallel) {
    args['parallel-mode'] = true;
  } else {
    args.env = 'default';
  }

  let start;

  if (isDev) {
    start = selenium();
  }

  return (cb) => {
    start.then((cp) => {
      nightwatch.runner(args, (err) => {
        console.log('************DONE********', err);
        isFunction(cp && cp.kill) && cp.kill();
        cb();
      }, {});
    }).catch((err) => {
      console.log('************ERR********', err);
    });
  };
}
