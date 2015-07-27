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

gulp.task('clean', function () {
  gulp.src('build', {read: false}).pipe(clean());
});

// 公共css,js合并压缩START
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

gulp.task('css-common',function() {
  return gulp.src('src/resource/css/*.css')
    .pipe(concat('global.css'))
    .pipe(minifyCss())
    .pipe(rev())
    .pipe(gulp.dest('build/src/resource/css'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('build/mainfest/css/global'));
});
// 公共css,js合并压缩END


// css/image 图片复制
gulp.task('css-image', function () {
  return gulp.src(['src/resource/images/*.*'], {base: 'src'})
    .pipe(rev())
    .pipe(gulp.dest('build/src'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('build/mainfest/images'));
});

gulp.task('js-copy', function () {
  return gulp.src(['src/framework/hybrid/*.*',
    'src/framework/vendor/*.*',
    'src/framework/vendor/**/*.*',
    'src/framework/vue/vue.min.js'], {base: '.'})
    .pipe(gulp.dest('build'));
});

//include处理
gulp.task('html',['css-image'], function () {
  var options = {
    compress: true
  };
  return gulp.src(['build/mainfest/**/*.json','src/web/**/*.html'], {base: '.'})
    //.pipe(fileinclude({prefix: '@@', basepath: './build'}))
    .pipe(inlinesource(options))
    .pipe(revCollector({replaceReved: true}))
    .pipe(gulp.dest('build'));
});


////公共css,js模板合并方式
//gulp.task('template',function () {
//  var assets = useref.assets();
//  return gulp.src(['src/template/**/*.html'], {base: '.'})
//    .pipe(assets)
//    .pipe(gulpif('*.js', uglify()))
//    .pipe(gulpif('*.css', minifyCss()))
//    .pipe(assets.restore())
//    .pipe(useref())
//    .pipe(gulp.dest('build'))
//});


gulp.task('dev', ['clean', 'template','css-image','html']);
gulp.task('publish', ['js-common', 'js-art','js-copy','css-common','css-image','html']);


