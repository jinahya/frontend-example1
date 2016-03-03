'use-scrict';

var del = require('del');
var imageminpngquant = require('imagemin-pngquant');
var mergestream = require('merge-stream');

var gulp = require('gulp');
var gulpcoffee = require('gulp-coffee');
var gulpconcat = require('gulp-concat');
var gulpimagemin = require('gulp-imagemin');
var gulpjshint = require('gulp-jshint');
var gulpsass = require('gulp-sass');
var gulptypescript = require('gulp-typescript');
var gulpuglify = require('gulp-uglify');
var gulputil = require('gulp-util');
var gulpzip = require('gulp-zip');

var paths = {
    src: 'src',
    dst: 'dst',
    dpl: 'dpl',
    markups: ['src/**/*.html'],
    javascripts: ['src/scripts/**/*.js'],
    coffeescripts: ['src/scripts/**/*.coffee'],
    typescripts: ['src/scripts/**/*.ts'],
    images: ['src/images/**/*']
};

// deletes dst/ and dpl/
gulp.task('clean', function () {
    return del.sync([paths.dst + '/**', paths.dpl + '/**']);
});

// processes markup files
gulp.task('markups', function () {
    return gulp.src(paths.markups)
            .pipe(gulp.dest(paths.dst));
});

// processes image files
gulp.task('images', function () {
    return gulp.src(paths.images)
            .pipe(gulpimagemin({
                progressive: true,
                svgoPlugins: [{removeViewBox: false}],
                use: [imageminpngquant()]
            }))
            .pipe(gulp.dest(paths.dst + '/images'));
});

// processes javascripts, coffeescripts, and typescripts
// produces dst/scripts/script.js
gulp.task('scripts', function () {
    return mergestream(
            (gulp.src(paths.javascripts) // javascripts
                    .pipe(gulpjshint())),
            (gulp.src(paths.coffeescripts) // coffeescripts
                    .pipe(gulpcoffee({bare: true}).on('error', gulputil.log))),
            (gulp.src(paths.typescripts) // typescripts
                    .pipe(gulptypescript())))
            .pipe(gulpuglify())
            //.pipe(gulpconcat('script.js'))
            .pipe(gulp.dest(paths.dst + '/scripts'));
});

// processes style files
gulp.task('styles', function () {
    return mergestream(
            (gulp.src('src/styles/**/*.css')), // css
            (gulp.src('src/styles/**/*.scss') // scss
                    .pipe(gulpsass().on('error', gulpsass.logError))))
            //.pipe(uglify())
            //.pipe(concat('script.js'))
            .pipe(gulp.dest(paths.dst + '/styles'));
});

// archives
gulp.task('archive', ['markups', 'images', 'scripts', 'styles'], function () {
    return gulp.src('**/*', {cwd: paths.dst, cwdbase: true})
            .pipe(gulpzip('archive.zip'))
            .pipe(gulp.dest(paths.dpl));
});

gulp.task('default', ['archive'], function () {

});

gulp.task('build', ['default'], function () {

});