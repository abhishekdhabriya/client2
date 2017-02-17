const {resolve} = require('path');  // resolve helps to resolve to an absolute path on the disk
const webpackValidator = require('webpack-validator');
const {getIfUtils} = require('webpack-config-utils');



module.exports = (env) => { // this is a function so we can accept parameters here.
    const {ifProd} = getIfUtils(env); // returns some functions which we can then invoke

    const config = webpackValidator({
        context: resolve('src/client'),
        entry: './client.js',
        output: {
            path: resolve('dist'),
            filename: 'bundle.js',
            publicPath: '/dist/', // webpack uses this path to serve it's in memory bundle.
            // some other loaders uses this path to put font's file and image files.
            // if we don't specify this then webpack assumes to servce up the bundle from / 
            pathinfo: true
        },
        devtool: ifProd('source-map', 'eval'),
        module: {
            loaders: [
                {
                    test: /\.js$/, // need to escape ., ? is optional, so either jsx or js, $ says at the end
                    loaders: ['babel', 'eslint'],
                    exclude: /node_modules/
                },
                {
                    test: /\.json$/,
                    loader: 'json'
                },
                {
                    test: /\.css$/,
                    loader: 'style!css?sourceMap'  // ! is like and, apply cs loader first and then pipe it through style loader. ? is query string to the loader. asking css loader to enable sourcemaps
                },
                {
                    test: /\.scss$/,
                    loader: 'style!css?sourceMap!sass?sourceMap'
                },
                {
                    test: /\.(png|jpg|jpeg|gif|woff|ttf|eot|svg|woff2)/,
                    loader: 'url-loader?limit=5000'  // if the file is smaller than 5000 bytes, it will inline the file. like icon files, it will inline into the file. meaning no network request needed.
                }
            ]
        }

    });
return config;
};