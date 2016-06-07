import path from 'path';
import nightwatch from 'nightwatch';
import merge from 'lodash/merge';
import isFunction from 'lodash/isFunction';
import selenium from '../util/selenium';
import {spawn} from 'child_process';

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
  }

  let start = Promise.resolve();

  if (isDev) {
    start = selenium();
  }

  return () => {
    return start.then((cp) => {
      const proms = ['default', 'firefox'].map(env => {
        return new Promise((res, rej) => {
          const cliArgs = JSON.stringify(
            Object.assign({}, args, {env})
          );

          const child = spawn('node', [
            path.resolve(__dirname, '..', 'util', 'runner.js'),
            cliArgs
          ], {
            stdio: 'inherit',
          });

          child.on('close', (code) => {
            code ? rej(code) : res(code);
          });
        });
      });

      return Promise.all(proms).then(() => Promise.resolve(cp));
    }).then((cp) => {
      console.log('************DONE********');
      isFunction(cp && cp.kill) && cp.kill();
    }).catch((err) => {
      console.log('************ERR********', err);
    });
  };
}

