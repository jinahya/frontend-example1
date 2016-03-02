'use-scrict';

var del = require('del');
var mergestream = require('merge-stream');

var gulp = require('gulp');
var coffee = require('gulp-coffee');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var typescript = require('gulp-typescript');
var uglify = require('gulp-uglify');
var util = require('gulp-util');
var zip = require('gulp-zip');

var paths = {
    src: 'src',
    dst: 'dst',
    dpl: 'dpl',
    javascripts: ['src/scripts/**/*.js'],
    coffeescripts: ['src/scripts/**/*.coffee'],
    typescripts: ['src/scripts/**/*.ts'],
    images: ['src/images']
};

// deletes dst/ and dpl/
gulp.task('clean', function () {
    return del([paths.dst + '/**', paths.dpl + '/**']);
});

// processes javascripts, coffeescripts, and typescripts
// produces dst/scripts/script.js
gulp.task('scripts', function () {
    return mergestream(
            (gulp.src(paths.javascripts) // javascripts
                    .pipe(jshint())),
            (gulp.src(paths.coffeescripts) // coffeescripts
                    .pipe(coffee({bare: true}).on('error', util.log))),
            (gulp.src(paths.typescripts) // typescripts
                    .pipe(typescript())))
            .pipe(uglify())
            .pipe(concat('script.js'))
            .pipe(gulp.dest(paths.dst + '/scripts'));
});

gulp.task('styles', function () {
    return mergestream(
            (gulp.src('src/styles/**/*.css')), // css
            (gulp.src('src/styles/**/*.scss') // scss
                    .pipe(sass().on('error', sass.logError))))
            //.pipe(uglify())
            //.pipe(concat('script.js'))
            .pipe(gulp.dest(paths.dst + '/styles'));
});

gulp.task('archive', ['scripts', 'styles'], function () {
    return gulp.src('**/*', {cwd: paths.dst, cwdbase: true})
            .pipe(zip('archive.zip'))
            .pipe(gulp.dest(paths.dpl));
});

gulp.task('default', ['archive'], function () {

});

gulp.task('build', ['clean', 'default'], function () {

});