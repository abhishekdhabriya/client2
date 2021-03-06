const {resolve} = require('path');  // resolve helps to resolve to an absolute path on the disk
const webpackValidator = require('webpack-validator');
const {getIfUtils, removeEmpty} = require('webpack-config-utils');
const webpack = require('webpack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const OfflinePlugin = require('offline-plugin');

const vendor = ['./node_modules/jquery/dist/jquery', './node_modules/tether/dist/js/tether', './node_modules/bootstrap/dist/js/bootstrap', 'lodash', 'react', 'react-dom', './src/index.scss']; // just telling webpack what it need to extract and put it in it's own bundle

module.exports = (env) => { // this is a function so we can accept parameters here.
    const {ifProd} = getIfUtils(env); // returns some functions which we can then invoke

    const config = webpackValidator({
        // context: resolve('src'),
        entry: {
            vendor: vendor,
            app: ['./src/index.js']
        },
        output: {
            path: resolve('dist'),
            filename: ifProd('bundle.[name].[chunkhash].js', 'bundle.[name].js'), // [name] is template name, refers to the key proprety of the entry block. like app and vendor
            // publicPath: '/dist/', // webpack uses this path to serve it's in memory bundle.
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
                    loader: ExtractTextWebpackPlugin.extract({
                        fallbackLoader: 'style',
                        loader: 'css?sourceMap'
                    })
                    // loader: 'style!css?sourceMap'  // ! is like and, apply cs loader first and then pipe it through style loader. ? is query string to the loader. asking css loader to enable sourcemaps
                },
                {
                    test: /\.scss$/,
                    loader: ExtractTextWebpackPlugin.extract({
                        fallbackLoader: 'style',
                        loader: 'css?sourceMap!sass?sourceMap'
                    })
                    // loader: 'style!css?sourceMap!sass?sourceMap'
                },
                {
                    test: /\.(png|jpg|jpeg|gif|woff|ttf|eot|svg|woff2)/,
                    loader: 'url-loader?limit=5000'  // if the file is smaller than 5000 bytes, it will inline the file. like icon files, it will inline into the file. meaning no network request needed.
                }
            ]
        },
        // externals: {
        //     // key is module name and value is variable available in external module
        //     jquery: 'jQuery' // this will let jquery be available as jQuery in our external script.for Bootstrap and                        //foundation to work properly
        // },
        plugins: removeEmpty([ // we need to wrap the plugins with removeEmpty because
            // webpack doesn't like an empty plugin (CommonsChunkPlugin is only going to be available in prod mode and will be empty in non prod mode)

            // plugins
            // with plugins we create a new instance.
            new ExtractTextWebpackPlugin(ifProd('styles.[name].[chunkhash].css', 'styles.[name].css')),
            ifProd(new InlineManifestWebpackPlugin()),
            new HtmlWebpackPlugin({
                template: './src/index.html',
                chunksSortMode: function (a, b) {  //alphabetical order
                    if (a.names[0] > b.names[0]) {
                        return -1;
                    }
                    if (a.names[0] < b.names[0]) {
                        return 1;
                    }
                    return 0;
                }
            }),
            new ProgressBarPlugin(),
            ifProd(new webpack.optimize.CommonsChunkPlugin({ name: ['vendor', 'manifest'] })), // extracting vendor component and creating vendor.js file.
            new webpack.DefinePlugin({ // define plugin allows us to define javascript variables in the resulting bundle as global variables that we can access.
                'process.env': { // we are asking webpack to create a global javascript object 
                    NODE_ENV: ifProd('"production"', '"development"') // a property
                },
                // IS_PRODUCTION: !isDevelopment, // by doing this we can now use IS_PRODUCTION in our own code as this will be available as a property of a global object 'process.env'
                // IS_DEVELOPMENT: isDevelopment   // can be used in code as process.env.IS_DEVELOPMENT
            }),
            new webpack.ProvidePlugin({ // with provide plugin we can assign a variable which it will watch for in our code and if it isn't define anywhere then webpack will inject the value.
                '$': 'jquery',   // so we can use $ in the module and at compile time webpack will inject jQuery in the module.
                'jQuery': 'jquery',
                "window.jQuery": "jquery",
                "window.Tether": 'tether',
                "Tether" : 'tether' // Bootstrap needs tether to load
            }),
            new OfflinePlugin() // allows service workers to cache the files and allow us to work offline.
        ])

    });
    return config;
};