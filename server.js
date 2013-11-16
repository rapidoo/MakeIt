var http = require('http');


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



var server = http.createServer(function(req, res) {
    res.writeHead(200, {"Content-Type": "text/html"});
    res.end(JSON.stringify(createReponse()));
});
server.listen(3000);
