
var port = process.env.PORT || 4000;
var server = require('./dist/server.js');

 http = require('http');

var httpServer = http.createServer(server.app)
 .listen(port, 'localhost', () => {
  console.log('listening on http://localhost:'+port);
 });


// var app = require('./dist/server');
// var port = process.env.PORT || 8080;
// //
// // app.listen(port);
//
//
// var app = require('http');
// // var app = require('./dist/server');
// app.createServer('./dist/server').listen(8080);
//
// console.log('listening on http://localhost:'+port);
