var http = require('http'); // this is built in module
var url = require('url'); // this is also a built-in module for URL parsing
var fs = require('fs'); // built-in module for file read from the webpage and display
//WebURL to test this: localhost:8080/index
// For Heroku to work use PORT
const PORT = process.env.PORT || 5500

http.createServer(function (req, res) { // To read from the file present in the directory
	var q = url.parse(req.url, true);
	var filename = "." + q.pathname;
	if(filename == './'){ // if these is No Query attached to it then, route a default web page
		filename = './index';
	}
	filename += '.html';
	fs.readFile(filename, function(err, data){
		if(err){
			res.writeHead(404, {'Content-Type':'text/html'});
			return res.end("404 NOT found");
		}
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write(data);
		console.log("... Incoming Request: " + req.url); // putting some logs into the node so that whenever website is accessed.
		res.end()
	}
	/*fs.readFile('index.html', function(err, data){
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write(data);
		console.log("... Incoming Request: " + req.url); // putting some logs into the node so that whenever website is accessed.
		res.end();
	}*/)
	/*res.writeHead(200, {'Content-Type': 'text/html'}); // 200 means everything is good!
	var q = url.parse(req.url, true).query; // Parsing the url
	var dates = q.year + " " + q.month;
	res.write(dates);
	//res.end('<h1>Hello World!</h1>');
	res.end();*/
}).listen(PORT);

console.log("Server Listening on Port 8080");