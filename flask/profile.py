from flask import jsonify, request
from app import  mongo
import operator

def profile():
	try:
		user = mongo.db.users.find_one({'':''}) # TODO: Add identification criteria
		if user:
			user['_id'] = str(user['_id'])
			return jsonify(user), 200

		return jsonify({'message': 'User Not Found'}), 404
	
	except Exception as e:
		print(e)
		return jsonify({'message': 'error'}), 500


def leader_board():
	try:
		data = mongo.db.users.find()
		result = [{"name": d['name'], "score": d['score']} for d in data]
		result = [element for element in sorted(result, key=operator.itemgetter("age"), reverse=True)]
		return jsonify(result), 200
	
	except Exception as e:
		print(e)
		return jsonify({'message': 'error'}), 500

