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

var src_exclude = ['!src/bower_components{,/**}'];

var paths = {
    //src: 'src',
    src_markups: ['src/**/*.html'].concat(src_exclude),
    src_images: ['images/**/*.png', 'images/**/*.jpg', 'images/**/*.svg'].concat(src_exclude),
    src_javascripts: ['src/scripts/**/*.js'].concat(src_exclude),
    src_coffeescripts: ['src/scripts/**/*.coffee'].concat(src_exclude),
    src_typescripts: ['src/scripts/**/*.ts'].concat(src_exclude),
    src_css: ['src/styles/**/*.css'].concat(src_exclude),
    src_sass: ['src/styles/**/*.scss'].concat(src_exclude),
    dst: 'dst',
    dst_markups: 'dst',
    dst_images: 'dst/images',
    dst_scripts: 'dst/scripts',
    dst_styles: 'dst/styles',
    dpl: 'dpl'
};

var environment = process.env.NODE_ENV
        || (gulputil.env.environment || 'production');
gulputil.log('environment: ' + environment);
process.env.NODE_ENV = environment;


// deletes dest/ and depl/
gulp.task('clean', function () {
    return del.sync([paths.dst + '/**', paths.dpl + '/**']);
});

// process main bower files
gulp.task("mainbowerfiles", function () {
    return gulp.src(mainbowerfiles(), {base: 'bower_components'})
            .pipe(gulpdebug({title: 'mainbowerfiles'}))
            .pipe(gulp.dest(paths.dst + '/bower_components'));
});

// processes javascripts, coffeescripts, and typescripts
gulp.task('scripts', ['mainbowerfiles'], function () {
    return mergestream(
            (gulp.src(paths.src_javascripts) // javascripts
                    .pipe(gulpjshint())),
            (gulp.src(paths.src_coffeescripts) // coffeescripts
                    .pipe(gulpcoffee({bare: true}).on('error', gulputil.log))),
            (gulp.src(paths.src_typescripts) // typescripts
                    .pipe(gulptypescript())))
            .pipe(gulpuglify())
            .pipe(gulp.dest(paths.dst_scripts));
});

// processes markup files
gulp.task('markups', function () {
    return gulp.src(paths.src_markups)
            .pipe(gulphtmlmin({collapseWhitespace: true}))
            .pipe(gulp.dest(paths.dst_markups));
});

// processes image files
gulp.task('images', function () {
    return gulp.src(paths.src_images)
            .pipe(gulpdebug({title: 'images'}))
            .pipe(gulpimagemin({
                progressive: true,
                svgoPlugins: [{removeViewBox: false}],
                use: [imageminpngquant()]
            }))
            .pipe(gulp.dest(paths.dst_images));
});


// processes style files
gulp.task('styles', function () {
    return mergestream(
            (gulp.src(paths.src_css)),
            (gulp.src(paths.src_sass).pipe(gulpsass().on('error', gulpsass.logError))))
            .pipe(gulpcleancss({debug: true}, function (details) {
                console.log(details.name + ': ' + details.stats.originalSize);
                console.log(details.name + ': ' + details.stats.minifiedSize);
            }))
            .pipe(gulpdebug({title: 'styles'}))
            .pipe(gulp.dest(paths.dst_styles));
});

// copies ./src/config/<environment>.json to ./dst/config/config.json
gulp.task('node-config', function () {
    return gulp.src([paths.src + '/config/' + environment + '.json'])
            .pipe(gulpdebug({title: 'node-config'}))
            .pipe(gulp.dest(paths.dst + "/config/config.json"));
});


// archives
gulp.task('archive', ['markups', 'images', 'scripts', 'styles', 'mainbowerfiles', 'node-config'], function () {
    return gulp.src('dst/*')
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
