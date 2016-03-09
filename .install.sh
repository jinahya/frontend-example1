#!/bin/sh
# -------------------------------------------------------------------------- npm
npmpath=$(which npm);
if [[ -z "$npmpath" ]]; then
    echo npm: command not found; you\'d better to install Node.js
    exit 1
fi
npmversion=$(npm --version)
echo installing node modules using $npmpath \($npmversion\) ...
$npmpath install &>/dev/null
# ------------------------------------------------------------------------ bower
bowerpath=$(which bower)
if [[ -z "$bowerpath" ]]; then
    echo bower: command not found
    echo installing bower ...
    sudo npm install -g bower &>/dev/null
fi
bowerversion=$(bower --version)
echo installing bower components using $bowerpath \($bowerversion\) ...
bower install &>/dev/null
# ------------------------------------------------------------------------- gulp
gulppath=$(which gulp)
if [[ -z "$gulppath" ]]; then
    echo gulp: command not found
    echo installing gulp-cli ...
    sudo npm install -g gulp-cli &>/dev/null
fi
# ------------------------------------------------------------------------- done
echo finished.
echo now you can build with gulp command.
exit 0
