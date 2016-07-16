/**
 * Created by taddeng on 2016/4/23.
 */
'use strict';
let path = require('path');
let JSPATH = path.join(process.cwd(), './src');
let NODE_MODULE_PATH = path.join(process.cwd(), 'node_modules');
let yargs = require('yargs');
let del = require('del');
let webpack = require('webpack');
del.sync('./dist');
let ENV = {
    DEBUG: yargs.argv.debug
};
if (!ENV.DEBUG) {
    process.env.NODE_ENV = 'production';
}

let config = {
    entry: {
        pager: path.join(JSPATH, 'pager.js'),
    },
    output: {
        path: './dist',
        filename: '[name].js',
        sourceMapFilename: '[file].[hash].map',
        library:'Pager',
        libraryTarget:'umd'
    },
    externals:[
        {
            react:'commonjs react',
            'react-dom':'commonjs react-dom',
            'ReactTransitionGroup':'commonjs ReactTransitionGroup'
        }
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: ['node_modules'],
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react'],
                    cacheDirectory: './babel-cache'
                }
            }
        ]
    }
};
if (ENV.DEBUG) {
    config.devtool = 'inline-source-map';
} else {
    config.plugins.push(
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }));
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({
        mangle: true
    }));
}
module.exports = config;