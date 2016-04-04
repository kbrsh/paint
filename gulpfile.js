'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var banner = require('gulp-banner')
var PAINT_VERSION = "v0.0.6"
var comment = '\/*\r\n* Paint ' + PAINT_VERSION + ' Alpha\r\n* Copyright (c) 2016, Kabir Shah\r\n* http:\/\/github.com\/KingPixil\/paint\/\r\n* Free to use under the MIT license.\r\n* http:\/\/www.opensource.org\/licenses\/mit-license.php\r\n*\/\r\n'

gulp.task('build', function () {
  return gulp.src('./src/_paint.js')
    .pipe(banner(comment))
    .pipe($.preprocess())
    .pipe($.rename('paint.js'))
    .pipe($['6to5']())
    .pipe($.size())
    .pipe(gulp.dest('./dist/'));
});

gulp.task('minify', ['build'], function() {
  return gulp.src(['./dist/paint.js'])
    .pipe($.uglify())
    .pipe(banner(comment))
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