'use-scrict';

var del = require('del');
var imageminpngquant = require('imagemin-pngquant');
var mainbowerfiles = require('main-bower-files');
var mergestream = require('merge-stream');

var gulp = require('gulp');
var gulpcleancss = require('gulp-clean-css');
var gulpcoffee = require('gulp-coffee');
var gulpconcat = require('gulp-concat');
var gulpdebug = require('gulp-debug');
var gulphtmlmin = require('gulp-htmlmin');
var gulpimagemin = require('gulp-imagemin');
var gulpjshint = require('gulp-jshint');
var gulpsass = require('gulp-sass');
var gulptypescript = require('gulp-typescript');
var gulpuglify = require('gulp-uglify');
var gulputil = require('gulp-util');
var gulpzip = require('gulp-zip');

var paths = {
    src: 'src',
    src_markups: ['src/**/*.html'],
    src_images: ['src/images/**/*'],
    src_javascripts: ['src/scripts/**/*.js'],
    src_coffeescripts: ['src/scripts/**/*.coffee'],
    src_typescripts: ['src/scripts/**/*.ts'],
    dst: 'dst',
    dpl: 'dpl'
};

var environment = process.env.NODE_ENV
        || (gulputil.env.environment || 'production');
gulputil.log('environment: ' + environment);


// deletes dest/ and depl/
gulp.task('clean', function () {
    return del.sync([paths.dst + '/**', paths.dpl + '/**']);
});

// processes markup files
gulp.task('markups', function () {
    return gulp.src(paths.src_markups)
            .pipe(gulphtmlmin({collapseWhitespace: true}))
            .pipe(gulp.dest(paths.dst));
});

// processes image files
gulp.task('images', function () {
    return gulp.src(paths.src_images)
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
            (gulp.src(paths.src_javascripts) // javascripts
                    .pipe(gulpjshint())),
            (gulp.src(paths.src_coffeescripts) // coffeescripts
                    .pipe(gulpcoffee({bare: true}).on('error', gulputil.log))),
            (gulp.src(paths.src_typescripts) // typescripts
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
            .pipe(gulpcleancss({debug: true}, function (details) {
                console.log(details.name + ': ' + details.stats.originalSize);
                console.log(details.name + ': ' + details.stats.minifiedSize);
            }))
            .pipe(gulp.dest(paths.dst + '/styles'));
});

// copies ./src/config/<environment>.json to ./dst/config/config.json
gulp.task('node-config', function () {
    return gulp.src([paths.src + '/config/' + environment + '.json'])
            .pipe(gulpdebug({title: 'node-config'}))
            .pipe(gulp.dest(paths.dst + "/config/config.json"));
});

gulp.task("mainbowerfiles", function () {
    return gulp.src(mainbowerfiles())
            .pipe(gulpdebug())
            .pipe(gulp.dest(paths.dst + '/externals/'));
});

// archives
gulp.task('archive', ['markups', 'images', 'scripts', 'styles', 'mainbowerfiles', 'node-config'], function () {
    return gulp.src('**/*', {cwd: paths.dst, cwdbase: true})
            .pipe(gulpzip('archive.zip'))
            .pipe(gulp.dest(paths.dpl));
});

gulp.task('default', ['archive'], function () {
});

gulp.task('build', ['default'], function () {

});

gulp.task('build-development', ['default'], function () {
    process.env.NODE_ENV = "stage";
    var config = require('config');
});
