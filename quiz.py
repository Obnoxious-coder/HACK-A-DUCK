from flask import session, request, jsonify, redirect
from app import mongo
import random
import datetime


def quiz():
    try:
        category = request.get_json()["category"]
        q = mongo.questions.find({"category": category})
        questions = []
        for element in q:
            element['_id'] = str(element['_id'])
            questions.append(element)

        if len(questions) > 0:
            session["questions"] = questions
            session["score"] = 0
            session["count"] = len(questions)
			session['cnt'] = min(10, len(questions))
            session['answers'] = []
            session['difficulty'] = min([element['difficulty'] for element in questions])
            return jsonify({'message': 'success', 'count': len(questions)}), 200
        return jsonify({'message': 'Question does not exist in given category'}), 400

    except Exception as e:
        print(e)
        return jsonify({'message': 'Internal Error'}), 500


def quiz_id(qid):
    try:
        if request.method == 'GET':
            if qid > session['cnt']:
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
    try:
       
        mongo.scores.insert_one({
            "email": session['user']['email'],
            "score": session['score'],
            "time": datetime.datetime.now().strftime("%d-%m-%Y %H:%M:%S")
        })
        return jsonify({'message': 'success', 'score': session["score"]})       
            
    except Exception as e:
        print(e)
        return jsonify({'message': 'error'}), 500


def send_question():
    try:
        r = random.randrange(0, session['count'] - 1)
        while True:
            question = session['questions'][r]
            r -= 1
            if question['difficulty'] == session['difficulty']:
                break

        session['questions'].remove(question)
        if question['type'] == 2:
            session['answers'].append(question['answer'].lower())
        else:
            session['answers'].append(question['answer']['correct'])
        session['count'] -= 1

        if question['type'] == 1:
            return jsonify({
                'text':question["text"],
                'type': 1,
                'option':question["answer"]
            })
        else:
            return jsonify({
                'text':question["text"],
                'type': 2
            })
    except IndexError as e:
        return jsonify({'message': 'No questions'}), 500

    except Exception as e:
        print(e)
        return jsonify({'message': 'error'}), 500


def next_difficulty(dec: bool):
    d = sorted(set([q['difficulty'] for q in session['questions']]), reverse=dec)
    current = session['difficulty']
    try:
        for i in range(len(d)-1):
            if d[i] == current:
                return d[i+1]
            elif (current > d[i-1] and current < d[i+1]) or (current < d[i-1] and current > d[i+1]):
                return d[i+1]
        return d[len(d) - 1]
        
    except Exception as e:
        return d[-1] if len(d) > 0 else 0
