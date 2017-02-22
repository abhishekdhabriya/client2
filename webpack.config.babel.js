const {resolve} = require('path');  // resolve helps to resolve to an absolute path on the disk
const webpackValidator = require('webpack-validator');
const {getIfUtils, removeEmpty} = require('webpack-config-utils');
const webpack = require('webpack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const vendor = ['lodash', 'react', 'react-dom']; // just telling webpack what it need to extract and put it in it's own bundle

module.exports = (env) => { // this is a function so we can accept parameters here.
    const {ifProd} = getIfUtils(env); // returns some functions which we can then invoke

    const config = webpackValidator({
        context: resolve('src/client'),
        entry: {
            app: './client.js',
            vendor: vendor
        },
        output: {
            path: resolve('dist'),
            filename: 'bundle.[name].[chunkhash].js', // [name] is template name, refers to the key proprety of the entry block. like app and vendor
            publicPath: '/dist/', // webpack uses this path to serve it's in memory bundle.
            // some other loaders uses this path to put font's file and image files.
            // if we don't specify this then webpack assumes to servce up the bundle from / 
            pathinfo: true // 
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
        },
        plugins: removeEmpty([ // we need to wrap the plugins with removeEmpty because
            // webpack doesn't like an empty plugin (CommonsChunkPlugin is only going to be available in prod mode and will be empty in non prod mode)

            // plugins
            // with plugins we create a new instance.
            new ProgressBarPlugin(),
            ifProd(new webpack.optimize.CommonsChunkPlugin({ name: 'vendor' })), // extracting vendor component and creating vendor.js file.
            new webpack.DefinePlugin({ // define plugin allows us to define javascript variables in the resulting bundle as global variables that we can access.
                'process.env': { // we are asking webpack to create a global javascript object 
                    NODE_ENV: `"${process.env.NODE_ENV} || 'development'"` // a property
                },
                // IS_PRODUCTION: !isDevelopment, // by doing this we can now use IS_PRODUCTION in our own code as this will be available as a property of a global object 'process.env'
                // IS_DEVELOPMENT: isDevelopment   // can be used in code as process.env.IS_DEVELOPMENT
            }),
            new webpack.ProvidePlugin({ // with provide plugin we can assign a variable which it will watch for in our code and if it isn't define anywhere then webpack will inject the value.
                '$': 'jquery',   // so we can use $ in the module and at compile time webpack will inject jQuery in the module.
                'jQuery': 'jquery'
            })
        ])

    });
    return config;
};