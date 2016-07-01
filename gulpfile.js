require('babel-core/register');
var gulp = require('gulp');
var eslint = require('gulp-eslint')
var istanbul = require('gulp-istanbul');
var isparta = require('isparta');
var mocha = require('gulp-mocha');
var webpack = require('webpack-stream');
var runSequence = require('run-sequence');

var TEST_FILES = './test/**/*.js';
var SRC_FILES = './lib/**/*.js';

gulp.task('lint-lib', function(){
  return gulp.src(SRC_FILES)
        .pipe(eslint(require('./.eslintrc.js')))
        .pipe(eslint.format());
});

gulp.task('lint-test', function(){
  return gulp.src(TEST_FILES)
        .pipe(eslint(require('./.eslintrc.js')))
        .pipe(eslint.format());
});
gulp.task('lint', ['lint-lib', 'lint-test']);

gulp.task('test', function(){
  return gulp.src(TEST_FILES, {read: false})
         .pipe(mocha({
          ui: 'tdd'
          }));
});
gulp.task('coverage:instrument', function() {
  return gulp.src(SRC_FILES)
    .pipe(istanbul({instrumenter: isparta.Instrumenter}))
    .pipe(istanbul.hookRequire()); // Force `require` to return covered files
});
gulp.task('coverage:report', function(done) {
  return gulp.src(SRC_FILES, {read: false})
    .pipe(istanbul.writeReports());
});

gulp.task('test:coverage', function(done){
  runSequence('coverage:instrument', 'test', 'coverage:report', done);
})

gulp.task('bundle', function(){
  return gulp.src('./lib/main.js')
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest('./dist'));
});

gulp.task('default', ['lint', 'test:coverage', 'bundle']);

gulp.task('watch', ['default'],function() {
  console.log("================================================================================");
  console.log("CHANGED ==> ", new Date());
  gulp.watch(TEST_FILES, ['lint-test', 'test:coverage']);
  gulp.watch(SRC_FILES, ['lint-lib', 'test', 'bundle']);
  console.log("================================================================================");
});

