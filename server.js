var http = require('http');

http.createServer(

	function(request,respond){
		respond.writeHead(200,{"Content-type":"plain-text"});
		respond.end('hello world');
	}

).listen(8888);