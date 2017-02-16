import gulp from 'gulp';
import path from 'path';
import rimraf from 'rimraf';
import webpackConfig from './webpack.config';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

const $ = require('gulp-load-plugins')(); //gulp-load-plugins brings in a function so we need to execute it. it will load all modules which starts with gulp-
// so we don't need to require them separately

//------------------------
// Client

// consoleStats will control the output of webpack
const consoleStats = {
    colors: true,
    exclude: ['node_modules'],
    chunks: false,
    assets: false,
    timings: true,
    modules: false,
    hash: false,
    version: false
};

gulp.task('client:clean', (cb) => {
    rimraf('./public/build', () => cb());
});

gulp.task('client:build', buildClient);
gulp.task('client:watch', watchClient);

gulp.task('client:dev', gulp.series(
    'client:clean',
    'client:build',
    'client:watch'
));

function buildClient(cb) {
    webpack(webpackConfig, (err, stats) => {
        if (err) {
            cb(err);
        } else {
            console.log(stats.toString(consoleStats));
            cb();
        }
    });
}

function watchClient() {
    const compiler = webpack(webpackConfig);
    const server = new WebpackDevServer(compiler, {
        publicPath : '/build/',
        hot: true,
        stats: consoleStats
    });
    server.listen(8082, ()=> {});
}




