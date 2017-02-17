process.env.BABEL_ENV = 'test';  // this will tell Babel to run in test mode.
const webpackEnv = { test: true };
const webpackConfig = require('./webpack.config.babel')(webpackEnv);

const testGlob = 'src/**/*.test.js';
const srcGlob = 'src/**/!(*.test | *.stub).js';


module.exports = (config) => {
    config.set({
        basePath: '',
        frameworks: ['mocha', 'chai'],
        files: [testGlob, srcGlob],
        exclude : ['./src/client/client.js'],
        preprocessors: {
            [testGlob]: ['webpack'], // key is the glob that matches the file we want to run through the prepocessor.
            [srcGlob]: ['webpack']  // webpack invokes karma-webpack plugin // plugin then looks in this file for webpack property which refers to the config.
        },
        webpack: webpackConfig, 
        webpackMiddleware: { noInfo: true }, // shuts off the webpack console output.
        reporters: ['progress', 'coverage'], // shows tests progress, coverage is code coverage reporter. this corresponds to karma-coverage
        coverageReporter: {
            check: { // this says to use this as threshold and if coverage drops below this level, the script will fail.
                global: {  // gloabl configuration
                    statements: 11,  // statements should not got below 11%
                    branches: 0,
                    functions: 0,
                    lines: 11
                }
            },
            reporters: [
                {
                    type: 'lcov',
                    dir: 'coverage/',
                    subdir: '.'
                },
                {
                    type: 'json',
                    dir: 'coverage/',
                    subdir: '.'
                },
                {
                    type: 'text-summary'
                }
            ]
        },
        port:9876,
        colors:true,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        browsers: ['Chrome'],
        singleRun: true,
        concurrency: Infinity
    });
};