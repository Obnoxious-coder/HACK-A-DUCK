from flask import jsonify, session, request
from app import mongo
import operator


def profile():
	try:
		user = mongo.users.find_one({'email': session['user']['email']})
		session.modified=True
		if user:
			user['_id'] = str(user['_id'])
			return jsonify({"name":user["name"],"email":user["email"]}), 200
		return jsonify({'message': 'User Not Found'}), 404
	
	except Exception as e:
		print(e)
		return jsonify({'message': 'error'}), 500


def leader_board():
	try:
		data = mongo.scores.aggregate([{
			"$group": {
				"_id": {
    				"name" : "$name",
    				"email" : "$email"
  				},
				"totalScores": {"$sum": "$score"}
			}
		}
		])

		if data:
			result = [d for d in sorted(data, key=operator.itemgetter('totalScores'), reverse=True)]
			return jsonify(result), 200
		return jsonify(list()), 200
	
	except Exception as e:
		print(e)
		return jsonify({'message': 'error'}), 500


def score():
	try:
		email=request.get_json()['email']
		scores = mongo.scores.find({"email": email})
		scores = [element for element in scores]
		for element in scores:
			element['_id'] = str(element['_id'])
		return jsonify({"score":scores}), 200

	except Exception as e:
		print(e)
		return jsonify({'message': 'error'}), 500
