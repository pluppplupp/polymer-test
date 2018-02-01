'use strict';

const {resolve, join} = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const IS_DEV_SERVER = process.argv.find(arg => arg.includes('webpack-dev-server'));
const OUTPUT_PATH = IS_DEV_SERVER ? resolve('src') : resolve('dist');

const copyStatics = {
    copyWebcomponents: [{
      from: resolve('./node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js'),
      to: join(OUTPUT_PATH, 'vendor'),
      flatten: true
    }, {
      from: resolve('./node_modules/@webcomponents/webcomponentsjs/webcomponents-lite.js'),
      to: join(OUTPUT_PATH, 'vendor'),
      flatten: true
    }, {
      from: resolve('./node_modules/@webcomponents/webcomponentsjs/webcomponents-sd-ce.js'),
      to: join(OUTPUT_PATH, 'vendor'),
      flatten: true
    }, {
      from: resolve('./node_modules/@webcomponents/webcomponentsjs/webcomponents-hi-sd-ce.js'),
      to: join(OUTPUT_PATH, 'vendor'),
      flatten: true
    }, {
      from: resolve('./node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js'),
      to: join(OUTPUT_PATH, 'vendor'),
      flatten: true
    }],
    copyOthers: [{
      from: 'assets/**',
      context: resolve('./src'),
      to: OUTPUT_PATH
    }, {
      from: resolve('./src/index.html'),
      to: OUTPUT_PATH,
      flatten: true
    }, {
      from: resolve('./src/manifest.json'),
      to: OUTPUT_PATH,
      flatten: true
    }]
  };
 
const plugins = [
    new CopyWebpackPlugin(copyStatics.copyWebcomponents, copyStatics.copyOthers)        
]  

module.exports = () => {
    return {
        entry: "./src/index.js",
        output: {
          path: OUTPUT_PATH, 
          filename: "bundle.js"
        },
        plugins: plugins,
        devtool: 'cheap-module-eval-source-map',
        module: {
            rules: [
              {
                test: /\.js$/,
                // We need to transpile Polymer itself and other ES6 code
                // exclude: /(node_modules)/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: [[
                      'env',
                      {
                        targets: {browsers: ['last 2 Chrome versions', 'Safari 10']},
                        debug: true
                      }
                    ]],
                    plugins: [['transform-object-rest-spread', {useBuiltIns: true}]]
                  }
                }
              }
            ]
          },
          devServer: {
            contentBase: OUTPUT_PATH,
            compress: true,
            overlay: {
              errors: true
            },
            port: 8080,
            host: '127.0.0.1',
            disableHostCheck: true
          }
      }
};
