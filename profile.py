from flask import jsonify, session
from app import mongo
import operator


def profile():
	try:
		email = session['user']['email']
		user = mongo.users.find_one({'email': email})
		if user:
			user['_id'] = str(user['_id'])
			return jsonify(user), 200

		return jsonify({'message': 'User Not Found'}), 404
	
	except Exception as e:
		print(e)
		return jsonify({'message': 'error'}), 500


def leader_board():
	try:
		data = mongo.scores.aggregate([{
			"$group": {
				"_id": "$email",
				"totalScores": {"$sum": "$score"}
			}
		}])

		if data:
			result = [d for d in sorted(data, key=operator.itemgetter('totalScores'), reverse=True)]
			return jsonify(result), 200
		return jsonify(list()), 200
	
	except Exception as e:
		print(e)
		return jsonify({'message': 'error'}), 500


def score():
	try:
		scores = mongo.scores.find({"email": session["user"]["email"]})
		scores = [element for element in scores]
		for element in scores:
			element['_id'] = str(element['_id'])
		return jsonify(scores), 200

	except Exception as e:
		print(e)
		return jsonify({'message': 'error'}), 500
