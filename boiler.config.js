export default {
  bucketBase: 'speedcurve-test',
  presets: ['base'],
  tasks: ['selenium'],
  addons: [
    'assemble-middleware',
    'assemble-nunjucks',
    'webpack-loaders-base',
    'webpack-babel',
    'webpack-styles'
  ]
};
