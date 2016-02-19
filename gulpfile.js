 /*
    Require Dependencies
    ========================================================================== */
    var gulp          = require('gulp'),
        autoprefixer  = require('gulp-autoprefixer'),
        concat        = require('gulp-concat'),
        gutil         = require('gulp-util'),
        livereload    = require('gulp-livereload'),
        notify        = require('gulp-notify'),
        plumber       = require('gulp-plumber'),
        sass          = require('gulp-sass'),
        sourcemaps    = require('gulp-sourcemaps'),
        uglify        = require('gulp-uglify');


 /*
    Error Handling - needs work
    ========================================================================== */
    var errorAlert = function(err) {
      gutil.log(err);
    };


 /*
    SASS Compilation / Minification Task
    ========================================================================== */
    gulp.task('sass', function () {
      gulp.src('./assets/stylesheets/sass/style.scss')
        .pipe(plumber({
          errorHandler: notify.onError("Error: <%= error.message %>")
          //errorHandler: errorAlert.. Use if error is notify error is not sufficient
          }))
        .pipe(sourcemaps.init())
        .pipe(sass({
          outputStyle: 'compressed'
          }))
        .pipe(sourcemaps.write())
        .pipe(autoprefixer())
        .pipe(gulp.dest('./'))
        .pipe(livereload());
    });


 /*
    JS Concat and Uglify
    ========================================================================== */
    gulp.task('scripts', function(){
      gulp.src([
        './assets/javascript/libs/**/*.js',
        './assets/javascript/scripts/**/*.js',
        ])
        .pipe(plumber({
          errorHandler: notify.onError("Error: <%= error.message %>")
          }))
        .pipe(sourcemaps.init())
        .pipe(concat('build.js'))
        .pipe(sourcemaps.write())
        .pipe(uglify())
        .pipe(gulp.dest('./assets/javascript'))
        .pipe(livereload());
    });


 /*
    Watch Task: SASS, JS, PHP
    ========================================================================== */
    gulp.task('watch', function () {

      // Start livereload server
      livereload.listen();

      // SASS Watch
      gulp.watch('./assets/stylesheets/sass/**/*.scss', ['sass']);

      // JS Watch
      gulp.watch('./assets/javascript/scripts/**/*.js', ['scripts']);

      // PHP Watch and Livereload
      gulp.watch(['./**/*.php']).on('change', function(file) {
        livereload.changed(file.path);
      });

    }); // End Watch Task


 /*
    Default Gulp Command
    ========================================================================== */
    gulp.task('default', ['sass', 'scripts', 'watch']);
