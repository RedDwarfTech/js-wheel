import webpack from 'webpack';
// https://stackoverflow.com/questions/41553291/can-you-import-nodes-path-module-using-import-path-from-path
import * as path from 'path';

export default {
  entry : {
    'index' : './index.ts', 
  } ,
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': '/Users/xiaoqiangjiang/source/reddwarf/frontend/js-wheel/src',
      '@net': '/Users/xiaoqiangjiang/source/reddwarf/frontend/js-wheel/src/net',
      '@auth': '/Users/xiaoqiangjiang/source/reddwarf/frontend/js-wheel/src/auth',
  },
  },
  output : {
    path :  '/Users/xiaoqiangjiang/source/reddwarf/frontend/js-wheel/dist' ,
    filename : '[name].js'
  },
  module : {
    rules : [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/],
        },
        exclude: /node_modules|\.d\.ts$/
      },
      {
        test : /\.js$/ ,
        exclude : [ /node_modules(?!(\/|\\?\\)(translation\.js|selection-widget|connect\.io|chrome-env)\1)/ ] ,
        loader : 'babel-loader'
      } ,
    ]
  }
};
