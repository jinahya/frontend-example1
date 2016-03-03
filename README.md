# webapp-example1

A sample project using [node](https://www.npmjs.com/), [gulp](http://gulpjs.com/), and [bower](http://bower.io/).

## directory structure
```
.
|-- bower.json
|-- gulpfile.js
|-- package.json
`-- src/
    |-- fonts/
    |-- images/
    |-- scripts/
    `-- styles/
```

## build
### bower
```
$ bower install
```
### node
```
$ npm install
```
### gulp
```
$ gulp
```
## gulp
### clean
* [`gulp-clean`](https://www.npmjs.com/package/gulp-clean) deprepated by `gulp-rmiraf`.
* [`gulp-rmiraf`](https://www.npmjs.com/package/gulp-rimraf) deprecated in favor of [`delete-files-folder`](https://github.com/gulpjs/gulp/blob/master/docs/recipes/delete-files-folder.md).

This project creates two directories while building. One is `dst/` for processed output and the other is `dpl/` for deployable archives.
```javascript
// deletes dst/ and dpl/
gulp.task('clean', function () {
    return del.sync([paths.dst + '/**', paths.dpl + '/**']);
});
```
### markups
```
// processes markup files
gulp.task('markups', function () {
    return gulp.src(paths.markups)
            .pipe(gulphtmlmin({collapseWhitespace: true}))
            .pipe(gulp.dest(paths.dst));
});
```
### images
```javascript
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
```
### scripts
The `scripts` task processes three types of scripts(javascripts, coffeescripts, and typescripts).
```javascript
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
```
### styles
```javascript
// processes style files
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
```
### archives
```javascript
// archives
gulp.task('archive', ['markups', 'images', 'scripts', 'styles'], function () {
    return gulp.src('**/*', {cwd: paths.dst, cwdbase: true})
            .pipe(gulpzip('archive.zip'))
            .pipe(gulp.dest(paths.dpl));
});
```
