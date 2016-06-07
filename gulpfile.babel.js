import 'babel-polyfill';
import gulp from 'gulp';
import build from 'boiler-core';

const {tasks, config, plugins} = build(gulp);
const {browserSync, sequence} = plugins;
const {sources, utils, environment} = config;
const {isDev} = environment;
const {buildDir} = sources;
const {addbase} = utils;

gulp.task('assemble', tasks.assemble);
gulp.task('browser-sync', tasks.browserSync);
gulp.task('clean', tasks.clean);
gulp.task('copy', tasks.copy);
gulp.task('deploy', tasks.ghPages);
gulp.task('selenium:tunnel', tasks.selenium);
gulp.task('nightwatch-api', tasks.nightwatchApi);
gulp.task('nightwatch-cp', tasks.nightwatchCp);
gulp.task('nightwatch', tasks.nightwatchGulp);
gulp.task('lint:test', tasks.eslint);
gulp.task('lint:build', tasks.eslint);
gulp.task('lint', ['lint:test', 'lint:build']);
gulp.task('webpack:global', tasks.webpack);
gulp.task('webpack:main', tasks.webpack);
gulp.task('webpack', ['webpack:global', 'webpack:main']);

gulp.task('build', (cb) => {
  if (isDev) {
    sequence(
      'clean',
      'lint',
      'webpack',
      'assemble',
      'browser-sync',
      cb
    );
  } else {
    sequence(
      'clean',
      'lint',
      'webpack',
      'assemble',
      'browser-sync',
      cb
    );
  }
});

gulp.task('default', ['build']);

gulp.task('watch', ['build'], () => {
  gulp.watch(
    addbase(buildDir, '{js,css}/**/*.{js,css}'),
    browserSync.reload
  );
});
