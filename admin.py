from flask import request, jsonify, session
from app import mongo


def admin():
    try:
        if 1:
            question = request.get_json()
            q_type = question['type']
            if q_type == 2:
                mongo.questions.insert({
                    "text": question['text'],
                    "category": question['category'],
                    "type": question['type'],
                    "difficulty": question['difficulty'],
                    "answer": question['answer']
                })
            else:
                mongo.questions.insert({
                    "text": question['text'],
                    "category": question['category'],
                    "type": question['type'],
                    "difficulty": question['difficulty'],
                    "answer": question['answer'],
                    "options": question['options']
                })
            return jsonify({'message': 'success'}), 200
        else:
            return jsonify({'message': 'Page not Found1'}), 404

    except Exception as e:
        print(e)
        return jsonify({'message': 'Page Not Found2'}), 404


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
