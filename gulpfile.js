'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.task('build', function () {
  return gulp.src('./src/_paint.js')
    .pipe($.preprocess())
    .pipe($.rename('paint.js'))
    .pipe($['6to5']())
    .pipe($.size())
    .pipe(gulp.dest('./dist/'));
});

gulp.task('minify', ['build'], function() {
  return gulp.src(['./dist/paint.js'])
    .pipe($.uglify())
    .pipe($.size())
    .pipe($.rename('paint.min.js'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('lint', function() {
  return gulp.src(['src/*.js', '!src/_*.js'])
    .pipe($.jshint())
    .pipe($.jshint.reporter('default'));
});


gulp.task('default', ['build', 'minify', 'lint']);

gulp.task('watch', function() {
  gulp.watch(['src/*.js'], ['default']);
});