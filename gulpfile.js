'use strict';
var gulp = require('gulp');
var useref = require('gulp-useref');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var fileinclude = require('gulp-file-include');
var inlinesource = require('gulp-inline-source');
var path = require('path');
var clean = require('gulp-clean');

gulp.task('clean', function () {
  gulp.src('build', {read: false}).pipe(clean());
});

// 公共css,js合并压缩
gulp.task('template',['clean'],function () {
  var assets = useref.assets();
  return gulp.src(['src/template/**/*.html'], {base: '.'})
    .pipe(assets)
    .pipe(gulpif('*.js', uglify()))
    .pipe(gulpif('*.css', minifyCss()))
    .pipe(assets.restore())
    .pipe(useref())
    .pipe(gulp.dest('build'))
});

// css/image 图片复制
gulp.task('css-image', ['clean'], function () {
  return gulp.src(['src/resource/**/*.*'], {base: '.'})
    .pipe(gulp.dest('build'));
});

//include处理  任务依赖template
gulp.task('html',['template'],function () {
  var options = {
    compress: false
  };
  return gulp.src(['src/web/**/*.html'], {base: '.'})
    .pipe(fileinclude({prefix: '@@', basepath: './build'}))
    .pipe(inlinesource(options))
    .pipe(gulp.dest('build'));
});


gulp.task('dev', ['clean', 'template','css-image','html']);


