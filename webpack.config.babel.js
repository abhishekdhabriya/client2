const {resolve} = require('path');
const webpackValidator = require('webpack-validator');


module.exports = () => {
return webpackValidator({
    context: resolve('src/client'),
    entry: './client.js',
        output : {
            filename: 'bundle.js'
        }
    });
};