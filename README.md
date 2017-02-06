# Reedsy-Text-Convert-Machine

To setup the client, I encountered a bug with the library quill.
After running "bower install quill", the file quill.js was actually typescript.
The javascript quill.js is supposed to be in dist/quill.js, and to build it,
I needed to run "npm run build".
This failed because of a trailing ";" in package.json "build" command :
"webpack --config _develop/webpack.config.js; rm dist/quill.core dist/quill.bubble dist/quill.snow;".



For
https://gist.github.com/pedrosanta/aa4ca7260cd7a3d658c739c194ec1743

Uses
https://material.io/icons/
https://mlab.com/
nodejs
angularjs
angular material
npm
bower
quill
https://github.com/daniel-nagy/md-data-table
https://api.cloudamqp.com/console/a9be2771-05e5-4cb5-bcae-060042d7d9c4/details
rabbitmq
https://github.com/marcbachmann/node-html-pdf
socket.io


Getting started

npm install
bower install
config.example.json
start app.js