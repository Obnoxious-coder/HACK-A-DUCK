from flask import jsonify, request, session
from app import  mongo
import operator

def profile():
	try:
		email = session['user']['email']
		user = mongo.db.users.find_one({'email':email})
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
		if data:
			result = [{"name": d['name'], "score": d['score']} for d in data]
			result = [element for element in sorted(result, key=operator.itemgetter("age"), reverse=True)]
			return jsonify(result), 200
		return jsonify(list()), 200
	
	except Exception as e:
		print(e)
		return jsonify({'message': 'error'}), 500

