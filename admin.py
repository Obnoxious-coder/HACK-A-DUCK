from flask import request, jsonify
from app import mongo


def admin():
    try:
        question = request.get_json()
        mongo.questions.insert({
            "text": question['text'],
            "category": question['category'],
            "type": question['type'],
            "difficulty": question['difficulty'],
            "answer": question['answer']
        })
        return jsonify({'message': 'success'}), 200

    except Exception as e:
        print(e)
        return jsonify({'message': 'error'}), 500


def list_category():
    try:
        if request.method == 'POST':
            category = request.get_json()['category']
            mongo.category.insert({"name": category})
            return jsonify({'message': 'success'}), 200

        else:
            category = mongo.category.find({})
            result = [element['name'] for element in category]
            return jsonify(result), 200

    except Exception as e:
        print(e)
        return jsonify({'message': 'error'}), 500
