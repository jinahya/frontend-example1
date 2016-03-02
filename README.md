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

## clean
* [`gulp-clean`](https://www.npmjs.com/package/gulp-clean) deprepated by `gulp-rmiraf`.
* [`gulp-rmiraf`](https://www.npmjs.com/package/gulp-rimraf) deprecated in favor of [`delete-files-folder`](https://github.com/gulpjs/gulp/blob/master/docs/recipes/delete-files-folder.md).

This project creates two directories while building. One is `dst/` for processed output and the other is `dpl/` for deployable archives.
```javascript
// deletes dst/ and dpl/
gulp.task('clean', function () {
    return del([paths.dst + '/**', paths.dpl + '/**']);
});
```

## scripts
The `scripts` task processes three types of scripts(javascripts, coffeescripts, and typescripts).
```javascript
// processes javascripts, coffeescripts, and typescripts
// produces dst/scripts/script.js
gulp.task('scripts', function () {
    return mergestream(
            (gulp.src(paths.javascripts)
                    .pipe(jshint())),
            (gulp.src(paths.coffeescripts)
                    .pipe(coffee({bare: true}).on('error', util.log))),
            (gulp.src(paths.typescripts)
                    .pipe(typescript())))
            .pipe(uglify())
            .pipe(concat('script.js'))
            .pipe(gulp.dest(paths.dst + '/scripts'));
});
```

## styles
```javascript
gulp.task('styles', function () {
    return mergestream(
            (gulp.src('src/styles/**/*.css')),
            (gulp.src('src/styles/**/*.scss')
                    .pipe(sass().on('error', sass.logError))))
            //.pipe(uglify())
            //.pipe(concat('script.js'))
            .pipe(gulp.dest(paths.dst + '/styles'));
});
```
