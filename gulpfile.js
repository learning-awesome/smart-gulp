'use strict';
var gulp = require('gulp');
var concat = require('gulp-concat');
var useref = require('gulp-useref');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var fileinclude = require('gulp-file-include');
var inlinesource = require('gulp-inline-source');
var path = require('path');
var clean = require('gulp-clean');
var rev = require('gulp-rev');
var revCollector = require('gulp-rev-collector');
var runSequence = require('run-sequence');
require('gulp-run-seq');


gulp.task('clean', function () {
  gulp.src('build', {read: false}).pipe(clean());
});

gulp.task('js-art', function() {
  return gulp.src('src/framework/artTemplate/*.js')
   .pipe(concat('art.js'))
   .pipe(uglify())
   .pipe(rev())
   .pipe(gulp.dest('build/src/framework/artTemplate'))
   .pipe(rev.manifest())
   .pipe(gulp.dest('build/mainfest/js/art'));
});

gulp.task('js-common', function() {
  return gulp.src('src/framework/common/*.js')
    .pipe(concat('common.js'))
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('build/src/framework/common'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('build/mainfest/js/common'));
});

gulp.task('js-bridge', function() {
  return gulp.src('src/framework/hybrid/*.js')
      .pipe(concat('bridge.js'))
      .pipe(uglify())
      .pipe(rev())
      .pipe(gulp.dest('build/src/framework/bridge'))
      .pipe(rev.manifest())
      .pipe(gulp.dest('build/mainfest/js/bridge'));
});


gulp.task('js-copy', function () {
    return gulp.src([
        'src/framework/vendor/*.*',
        'src/framework/vendor/**/*.*',
        'src/framework/vue/vue.min.js'], {base: '.'})
        .pipe(gulp.dest('build'));
});


gulp.task('rev-image', function () {
  return gulp.src(['src/resource/images/*.*'],{base:'src/resource'})
      .pipe(rev())
      .pipe(gulp.dest('build/src/resource'))
      .pipe(rev.manifest({}))
      .pipe(gulp.dest('build/mainfest/images'));
});



gulp.task('replace-css', function () {
    return gulp.src(['build/mainfest/images/*.json','src/resource/css/*.css'], {base: '.'})
        //.pipe(fileinclude({prefix: '@@', basepath: './build'}))
        .pipe(revCollector({replaceReved: true}))
        .pipe(concat('global.css'))
        .pipe(minifyCss())
        .pipe(rev())
        .pipe(gulp.dest('build/src/resource/css'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('build/mainfest/css'));

});


gulp.task('replace-html', function () {
    var options = {
        compress: true
    };
    return gulp.src(['build/mainfest/**/*.json','src/web/**/*.html'], {base: '.'})
        //.pipe(fileinclude({prefix: '@@', basepath: './build'}))
        .pipe(inlinesource(options))
        .pipe(revCollector({replaceReved: true}))
        .pipe(gulp.dest('build'));
});


gulp.task('js', ['js-common','js-bridge', 'js-art','js-copy']);
gulp.task('image', ['rev-image']);
gulp.task('css', ['replace-css']);
gulp.task('html', ['replace-html']);
gulp.task('build', ['js','image','css','html']);

gulp.task('publish', function () {
    return gulp.src(['build/src/**/*.*'], {base: 'build/src'})
        .pipe(gulp.dest('/Users/sky/dev/github/smart-android/assets/app'));
});

