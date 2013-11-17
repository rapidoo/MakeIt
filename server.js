var http = require('http');
var fs = require('fs');

function createList() {
  var liste = [];
	for (var i = 0; i < 100; i++) {
    liste.push(createPoint());
  }
  return liste;
} 

function createPoint() {
  var point = {}
  point['lat'] = 43+Math.random()*8;
  point['long'] = Math.random()*8-1;
  return point
}

function createReponse(){
	var tableau = {};
	tableau['list']=createList();
	return tableau;
}

function createRequete(){
	var tableau = {};
	var alea = Math.floor(Math.random()*10000);
	console.log(alea);
	var quoi = 'resto'+alea;
	var ou = 'Rennes'+alea;
	tableau['requete'] = {'quoi':quoi,'ou':ou, 'timestamp':Date.now()};
	
	return tableau;
}

var server = http.createServer(function(req, res) {

	console.log(req.url);

	if(req.url == '/api/requete'){
		res.writeHead(200, {"Content-Type": "text/html"});
    	res.end(JSON.stringify(createRequete()));
	}
    else if(req.url == '/api/points'){

    	res.writeHead(200, {"Content-Type": "application/json"});
    	res.end(JSON.stringify(createReponse()));
	}
	 else if(req.url == '/'){
		fichier = req.url.substr(1);
		console.log(fichier);
		 fs.readFile('index.html',function (err, data){
	        res.writeHead(200, {'Content-Type': 'text/html','Content-Length':data.length});
	        res.write(data);
	        res.end();
	    });

	}
	else if(req.url == '/favicon.ico'){
		res.writeHead(404, {'Content-Type': 'text/html','Content-Length':0});
	    res.end();
	}
	else{
		fichier = req.url.substr(1);
		console.log(fichier);
		 fs.readFile(fichier,function (err, data){
	        res.writeHead(200, {'Content-Type': 'text/html','Content-Length':data.length});
	        res.write(data);
	        res.end();
	    });

	}
});
server.listen(3000);
