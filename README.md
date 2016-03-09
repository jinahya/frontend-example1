# frontend-example1

[![Build Status](https://travis-ci.org/jinahya/frontend-example1.svg?branch=master)](https://travis-ci.org/jinahya/frontend-example1)

A sample project using [node](https://www.npmjs.com/), [gulp](http://gulpjs.com/), and [bower](http://bower.io/).

## Prepare
You can install all required modules and components using `.install.sh` if you already installed the [Node.js](https://nodejs.org/en/).
```
$ which npm
/usr/local/bin/npm
$ sh ./.install.sh
installing node modules using /usr/local/bin/npm (3.8.1) ...
installing bower components using /usr/local/bin/bower (1.7.7) ...
finished.
now you can build with gulp command.
$ 
```
### Node.js
Install, if `npm` command is not available, [Node.js](https://nodejs.org/en/).
```
$ brew install node
$ which npm
```
### Gulp.js
Install, if `gulp` command is not available, [Gulp](http://gulpjs.com/).
```
$ sudo npm -g install gulp-cli
$ which gulp
```
### Bower
Install, if `bower` command is not available, [Bower](http://bower.io/).
```
$ sudo npm -g install bower
$ which bower
```
### node_modules
Install required node modules.
```
$ npm install
$ ls node_modules
```
### bower_components
Install dependent bower components.
```
$ bower install
$ ls src/bower_components
```

## Build
```
$ gulp
$ ls dst
$ ls dpl
```
