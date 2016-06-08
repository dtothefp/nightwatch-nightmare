export default {
  bucketBase: 'nightwatch-nightmare',
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
