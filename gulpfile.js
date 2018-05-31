var gulp  = require('gulp'),
    gutil = require('gulp-util'),
    sass  = require('gulp-sass');

// create a default task and just log a message
gulp.task('build-css', function() {
  return gulp.src('src/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('public/assets/css'));
});

gulp.task('build-js', function() {
  return gulp.src('src/js/**/*.js')
    .pipe(gulp.dest('public/assets/js'));
});

gulp.task('watch', function() {
  gulp.watch('src/scss/**/*.scss', ['build-css']);
  gulp.watch('src/js/**/*.js', ['build-js']);
});