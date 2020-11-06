from flask import session, request, jsonify, redirect
from app import mongo
import random
import datetime


def quiz():
    try:
        category = request.get_json["category"]
        count = mongo.questions.count({"category": category})

        if count > 0:
            session["questions"] = mongo.questions.find({"category": category})
            session["score"] = 0
            session["count"] = count
            session['answers'] = []
            session['difficulty'] = 1
            return jsonify({'message': 'success', 'count': count}), 200
        return jsonify({'message': 'Question does not exist in given category'}), 400

    except Exception as e:
        print(e)
        return jsonify({'message': 'Internal Error'}), 500


def quiz_id(qid):
    try:
        if request.method == 'GET':
            if qid > 10:
                return redirect('/quiz/submit')

            if (len(session["answers"]) + 1) == qid:
                return send_question()
            return jsonify({'message': 'Unauthorized access'}), 401

        else:
            if session["answers"][-1].lower() == request.get_json()['answer'].lower():
                session["score"] += 1
                session['difficulty'] = next_difficulty(False)
                return jsonify({'correct': True})

            session['difficulty'] = next_difficulty(True)
            return jsonify({'correct': False})

    except Exception as e:
        print(e)
        return jsonify({'message': 'Internal Error'}), 500


def submit_quiz():
    mongo.scores.insert_one({
        "email": session['user']['email'],
        "score": session['score'],
        "time": datetime.datetime.now().strftime("%d-%m-%Y %H:%M:%S")
    })
    return jsonify({'message': 'success', 'score': session["score"]})


def send_question():
    r = random.randrange(0, session['count'] - 1)
    while True:
        question = session['questions'][r]
        r -= 1
        if question['difficulty'] == session['difficulty']:
            break

    session['questions'].remove(question)
    session['answers'].append(question['answer'].lower())
    session['count'] -= 1

    if question['type'] == 1:
        return jsonify({
            'text': question['text'],
            'type': 1,
            'options': question['options']
        })
    else:
        return jsonify({
            'text': question['text'],
            'type': 2
        })


def next_difficulty(dec: bool):
    d = iter(sorted(set([q['difficulty'] for q in session['questions']]), reverse=dec))

    try:
        while True:
            if next(d) > session['difficulty']:
                return d
    except StopIteration as e:
        return max(d) if dec else min(d)
