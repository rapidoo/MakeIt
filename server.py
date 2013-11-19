import pymongo
from pymongo import MongoClient

import random
import time
import bottle
from bottle import route, run, template
from bottle import static_file

@route('/')
def index():
    return static_file("index.html", root='/home/ldapusers/flebris/MakeIt/') 


@route('/api/marker')
def marker():
    return createMarker()

@route('/api/requete')
def requete():
    return createRequete()


@route('/static/<filename>')
def server_static(filename):
    return static_file(filename, root='/home/ldapusers/flebris/MakeIt/static')

def createRequete():
	tableau = {};
        alea = random.randint(1, 100000);
        quoi = "resto%i " % alea;
        ou = "Rennes%i " % alea;
	print quoi, ou;
        tableau['requete'] = {'quoi':quoi,'ou':ou, 'timestamp':time.time()};

        return tableau;

def createMarker():
	res = col.find({}, {'_id':0})

	alea = random.random();
	objet = res[0]

	lg =  str(alea+float(res[0]['requete']['longitude'])-5)
	lat =  str(alea+float(res[0]['requete']['latitude']))

	objet['requete']['longitude'] = lg
	objet['requete']['latitude'] = lat

	return objet


client = MongoClient('mongodb://aladin:aladin@mongo02t.bbo1t.local:27028/perfAladinDB')

db = client.perfAladinDB
col = db.requete


bottle.debug(True)
run(host='bigdata04t.bbo1t.local', port=8080)





