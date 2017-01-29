# Reedsy-Text-Convert-Machine

To setup the client, I encountered a bug with the library quill.
After running "bower install quill", the file quill.js was actually typescript.
The javascript quill.js is supposed to be in dist/quill.js, and to build it,
I needed to run "npm run build".
This failed because of a trailing ";" in package.json "build" command :
"webpack --config _develop/webpack.config.js; rm dist/quill.core dist/quill.bubble dist/quill.snow;".

Uses
https://material.io/icons/
https://mlab.com/
nodejs
angularjs
angular material
npm
bower
quill
