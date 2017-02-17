process.env.BABEL_ENV = 'test';
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
        webpackMiddleware: { noInfo: true },
        reporters: ['progress', 'coverage'],
        coverageReporter: {
            check: {
                global: {
                    statements: 11,
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