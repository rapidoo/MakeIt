import pymongo
from pymongo import MongoClient

import random
import time
from datetime import datetime
from datetime import timedelta
import bottle
from bottle import route, run, template
from bottle import static_file

@route('/<filename>')
def index(filename):
    return static_file(filename, root='/home/bia/MakeIt') 

@route('/static/<filename>')
def server_static(filename):
    return static_file(filename, root='/home/bia/MakeIt/static')

@route('/static/images/<filename>')
def server_static(filename):
    return static_file(filename, root='/home/bia/MakeIt/static/images')



@route('/api/marker')
def marker():
    return createMarker()

@route('/api/compteur')
def compteur():
    return createCompteur()

@route('/api/vertical')
def compteur():
    return createVertical()



def createMarker():
	
	datenow = datetime.now()
	dateplusone = datenow + timedelta(seconds=1)
	formatString = "T%H:%M:%S"
	dateString="2013-11-16"
	dateDebut = dateString+datenow.strftime(formatString)
	dateFin = dateString+dateplusone.strftime(formatString)

	query = {'date_ts': { '$gt': dateDebut, '$lt': dateFin}}

	res = col.find(query, {'_id':0})

	listObject = []
	for i in res:
		listObject.append(i) 

	objet = {}
	objet['requete']=listObject

	return objet

def createCompteur():

        datenow = datetime.now()
        formatString = "T%H:%M:%S"
        dateString="2013-11-16"
        dateDebut = dateString+datenow.strftime(formatString)

        query = {'date_ts': { '$lt': dateDebut}}

        res = col.find(query).count()

	retour = {}
	retour['total']=res
	retour['date']=dateDebut
	print retour
        return retour

def createVertical():

	datenow = datetime.now()
        dateplusone = datenow + timedelta(seconds=1)
        formatString = "T%H:%M:%S"
        dateString="2013-11-16"
        dateDebut = dateString+datenow.strftime(formatString)
        dateFin = dateString+dateplusone.strftime(formatString)

	query = [{'$match' :{'date_ts': {'$gt': dateDebut, '$lt': dateFin }}} ,{'$group':{'_id':'$verticales', 'count':{'$sum':1}}}]

	print query
#	db.recherches.aggregate([{$match :{'date_ts': {'$gt': '2013-11-16T15:32:25', '$lt': '2013-11-16T15:32:26'}}} ,{$group:{"_id":"$verticales", "count":{"$sum":1}}}])
	
        res = col.aggregate(query)

        return res




client = MongoClient('mongodb://aladin:aladin@mongo02t.bbo1t.local:27028/perfAladinDB')

db = client.perfAladinDB
col = db.recherches

bottle.debug(True)
run(host='bigdata04t.bbo1t.local', port=8080)






