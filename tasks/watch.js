const gulp = require('gulp');
const config = require('../package').gulp;

const watch = () => {
  gulp.watch([`${config.src.scss}${config.selectors.scss}`], ['build-scss']);
  // gulp.watch(`${config.src.js}${config.selectors.js}`, ['build-js']);
};

gulp.task('watch-all', watch);
module.exports = watch;