const path = require('path');
const upperFirst = require('lodash/upperFirst');
const camelCase = require('lodash/camelCase');
const {
  name, version, repository,
} = require('./package.json');

module.exports = {
  title: `${upperFirst(camelCase(name))} v${version}`,
  ribbon: {
    url: repository.url,
    text: 'View on GitHub',
  },
  moduleAliases: { 'resource-workspace-rcl': path.resolve(__dirname, 'src') },
  skipComponentsWithoutExample: true,
  ignore: ['**/helpers**', '**/styled**', '**/__tests__/**', '**/*.test.{js,jsx,ts,tsx}', '**/*.spec.{js,jsx,ts,tsx}', '**/*.d.ts'],
  serverPort: 6003,
  exampleMode: 'expand',
  usageMode: 'expand',
  getComponentPathLine(componentPath) {
    const componentName = path.basename(componentPath, '.js');
    return `import { ${componentName} } from '${name}';`;
  },
  webpackConfig: {
    //https://github.com/facebook/create-react-app/pull/8079#issuecomment-562373869
    devServer: { port: 6003, transportMode: 'ws' },
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            { loader: 'css-loader' },
          ],
        },
      ],
    },
  },
};
