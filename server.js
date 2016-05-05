var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');


var mimeType={
	"html" : "text/html",
	"jpg" : "image/jpeg",
	"jpeg" : "image/jpeg",
};

http.createServer(

	function(req,res){
		
		var uri = url.parse(req.url).pathname;
		var fileName = path.join(  process.cwd() , unescape(uri) );

		console.log('Loading ...' + uri);

		try{
			var stats = fs.lstatSync(fileName);
		}catch(err){
			res.writeHead( 404,{"Content-type":"text/plain"} );
			res.write("Page not found");
			res.end();

			return ;
		}

		if ( stats.isFile() ){
			var mime= mimeType[ path.extname(fileName).split(".").reverse()[0]  ];
			res.writeHead( 200,{"Content-type":mime} );
			fs.createReadStream( fileName ).pipe( res );
		}else if ( stats.isDirectory() ){
			res.writeHead( 302, {"Location":"index.html"} );
			res.end();
		}else{
			res.writeHead( 500,{"Content-type":"text/plain"} );
			res.write("Internal Error");
			res.end();
		}

	}

).listen(8888);