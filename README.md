# Reedsy Text Convert Machine

![App snapshot](https://github.com/AlexPavy/Reedsy-Text-Convert-Machine/blob/master/doc/text_convert_machine.PNG)

## Reedsy test

[Reedsy Node.js Fullstack Engineer Challenge](https://gist.github.com/pedrosanta/aa4ca7260cd7a3d658c739c194ec1743)

[Answer to questions 1 to 3](https://github.com/AlexPavy/Reedsy-Text-Convert-Machine/blob/master/doc/ReedsyTest.pdf)

## Setup

Steps
* execute "npm install"
* check config in config/ folder
* execute "npm start"
* start web browser on localhost:3000

## Dependencies
* [MongoDB](https://www.mongodb.com)
* [mLab](https://mlab.com/)
* [Nodejs](https://nodejs.org/en/)
* [NPM](https://www.npmjs.com/)
* [CloudAMQP](https://customer.cloudamqp.com/instance)
* [Quill](http://quilljs.com/)
* [node-html-pdf](https://github.com/marcbachmann/node-html-pdf)
* [Angular js](https://angularjs.org/)
* [Angular Material](https://material.angularjs.org/latest/)
* [Material Icons](https://material.io/icons/)
* [Material Design Data Table](https://github.com/daniel-nagy/md-data-table)
* [socket.io](http://socket.io/)
* [bluebird](http://bluebirdjs.com/docs/getting-started.html)

### Quill.js
To setup the client, I encountered a bug with the library quill.

I finally copied the build js and css files in a dedicated client/lib folder

After running "bower install quill", the file quill.js was actually typescript.
The javascript quill.js is supposed to be in dist/quill.js, and to build it,

I needed to run "npm install" then "npm run build".
This failed because of a trailing ";" in package.json "build" command :

"webpack --config _develop/webpack.config.js; rm dist/quill.core dist/quill.bubble dist/quill.snow;".

### Heroku

[This app on Heroku](https://text-convert-machine.herokuapp.com/)

I could not get the filesystem working on the Heroku server, in order to download the files.
I could also not get socket.io to work.
It all works on my local machine however.
