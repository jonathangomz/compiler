/*
//serve-html.js
var http = require('http');
var fs = require('fs');

http.createServer(function (req, res) {
  console.log("Port Number : 8000");
  // change the MIME type from 'text/plain' to 'text/html'
  res.writeHead(200, {'Content-Type': 'text/html'});
  //reading the content file
  fs.readFile('./index.html', (err, data) => {
    //checking for errors
    if (err)
      throw err;
    console.log("Operation Success");
    //sending the response
    res.end(data);
  });
}).listen(8000);
 */           

var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic(__dirname)).listen(8080, function(){
    console.log('Server running on 8080...');
});