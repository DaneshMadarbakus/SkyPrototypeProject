const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const browserSync = require('browser-sync').create();
const config = require('../package').gulp;

const serve = () => {
    let started = false;

    browserSync.init(null, {
        proxy: 'http://localhost:4000',
        files: [`${config.src.html}${config.selectors.html}`, `${config.src.dist}${config.selectors.css}`, `${config.src.dist}${config.selectors.js}`],
        browser: 'google chrome',
        port: 7000,
        reloadDelay: 1000
    });

    return nodemon({
        script: config.main.server,
        ignore: [`${config.src.js}${config.selectors.js}`, `${config.src.scss}${config.selectors.scss}`],
        env: { NODE_ENV: 'development' }
    })
        .on('start', () => {
            if (!started) {
                browserSync.reload();
            } else {
                started = false;
            }
        });
};

gulp.task('serve', serve);
module.exports = serve;