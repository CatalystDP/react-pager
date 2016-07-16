/**
 * Created by taddeng on 2016/4/23.
 */
'use strict';
let path = require('path');
let JSPATH = path.join(process.cwd(), 'test/src');
let NODE_MODULE_PATH = path.resolve(process.cwd(),'node_modules');
console.log(NODE_MODULE_PATH);
let yargs = require('yargs');
let del = require('del');
let webpack = require('webpack');
del.sync('./test/dist');
let ENV = {
    DEBUG: yargs.argv.debug
};
if (!ENV.DEBUG) {
    process.env.NODE_ENV = 'production';
}
const REACT=path.join(NODE_MODULE_PATH,'react');
const REACTDOM=path.join(NODE_MODULE_PATH,'react-dom');
const REACTLIB=path.join(NODE_MODULE_PATH,'react/lib');
let config = {
    entry: {
        app: path.join(JSPATH, 'index.js'),
        vendor:[
            REACT,
            REACTDOM,
            path.join(REACTLIB,'ReactTransitionGroup.js'),
            path.join(REACTLIB,'ReactCssTransitionGroup.js')
        ]
    },
    output: {
        path: './test/dist',
        filename: '[name].js',
        sourceMapFilename: '[file].[hash].map'
    },
    resolve: {
        alias: {
            'react':REACT,
            'react-dom':REACTDOM,
            'ReactTransitionGroup':path.join(REACTLIB,'ReactTransitionGroup.js'),
            'ReactCssTransitionGroup':path.join(REACTLIB,'ReactCssTransitionGroup.js'),
            'Pager':path.join(process.cwd(),'dist/pager.js')
        }
    },
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
config.plugins = [
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        filename: '[name].js',
        minChunks:Infinity
    })
];
config.plugins.push(
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify('production')
        }
    }));
config.devtool = 'inline-source-map';

module.exports = config;