from flask import session, request, jsonify, redirect
from app import mongo
import random
import datetime
q=[]
s=0
c=0
cnt=0
ans=[]
d=0

def quiz():
    global q
    global s
    global c
    global cnt
    global ans
    global d
    try:
        category = request.get_json()["category"]
        q = mongo.questions.find({"category": category})
        questions = []
        for element in q:
            element['_id'] = str(element['_id'])
            questions.append(element)

        if len(questions) > 0:
            q = questions
            s = 0
            c = len(questions)
            cnt = min(10,len(questions))
            ans = []
            d = min([element['difficulty'] for element in questions])
            return jsonify({'message': 'success', 'count': len(questions)}), 200
        return jsonify({'message': 'Question does not exist in given category'}), 400

    except Exception as e:
        print(e)
        return jsonify({'message': 'Internal Error'}), 500


def quiz_id(qid):
    global q
    global s
    global c
    global cnt
    global ans
    global d
    try:
        if request.method == 'GET':
            if qid > cnt:
                return jsonify({'message': 'Max '}), 401

            if (len(ans) + 1) == qid:
                return send_question()
            return jsonify({'message': 'Unauthorized access'}), 401

        else:
            if ans[-1].lower() == request.get_json()['answer'].lower():
                s += 1
                d = next_difficulty(False)
                return jsonify({'correct': True})

            d = next_difficulty(True)
            return jsonify({'correct': False})

    except Exception as e:
        print(e)
        return jsonify({'message': 'Internal Error'}), 500


def submit_quiz():
    global q
    global s
    global c
    global cnt
    global ans
    global d
    try:
        email=request.get_json()['email']
        mongo.scores.insert_one({
            
            "email": email,
            "score": s,
            "time": datetime.datetime.now().strftime("%d-%m-%Y %H:%M:%S")
        })
        return jsonify({'message': 'success', 'score': s})       
            
    except Exception as e:
        print(e)
        return jsonify({'message': 'error'}), 500


def send_question():
    global q
    global s
    global c
    global cnt
    global ans
    global d
    try:

        r = random.randrange(0, c)

        while True:
            question = q[r]
            r -= 1
            if question['difficulty'] == d:
                break

        q.remove(question)
        if question['type'] == 2:
            ans.append(question['answer'].lower())
        else:
            ans.append(question['answer'])
        c -= 1

        if question['type'] == 1:
            return jsonify({
                'text':question["text"],
                'type': 1,
                'option':question["options"]
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
    global q
    global s
    global c
    global cnt
    global ans
    global d
    dif = sorted(set([qes['difficulty'] for qes in q]), reverse=dec)
    current = d
    try:
        for i in range(len(dif)-1):
            if dif[i] == current:
                return dif[i+1]
            elif (current > dif[i-1] and current < dif[i+1]) or (current < dif[i-1] and current > dif[i+1]):
                return d[i+1]
        return dif[len(dif) - 1]
        
    except Exception as e:
        return dif[-1] if len(dif) > 0 else 0
