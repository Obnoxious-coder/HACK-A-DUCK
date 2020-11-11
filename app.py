from flask import Flask
import pymongo, urllib
from flask_bcrypt import Bcrypt
from flask_cors import CORS

app = Flask(__name__)
app.config['SECRET_KEY'] = '7a92db426dc5bf58777aa19acdaa2044'
bcrypt = Bcrypt(app)
CORS(app)
# CORS(app, supports_credentials=True)
# cors=CORS(app,supports_credentials=True,resources={
#     r"/*":{
#         "origins":"*"
#     }
# })

client = pymongo.MongoClient("mongodb+srv://Jonathan:" + urllib.parse.quote("Jonathan@123") +
                             "@cluster0.naqqj.mongodb.net/QUIZAPP?retryWrites=true&w=majority")
mongo = client["test2"]


import admin
app.add_url_rule('/admin', view_func=admin.admin, methods=['POST'])
app.add_url_rule('/category', view_func=admin.list_category, methods=['POST', 'GET'])


import profile
app.add_url_rule('/profile', view_func=profile.profile, methods=['GET'])
app.add_url_rule('/leaderboard', view_func=profile.leader_board, methods=['GET'])
app.add_url_rule('/scores', view_func=profile.score, methods=['POST'])


import user
app.add_url_rule('/register', view_func=user.register, methods=['POST'])
app.add_url_rule('/login', view_func=user.login, methods=['POST'])
app.add_url_rule('/signout', view_func=user.sign_out, methods=['GET'])

import quiz
app.add_url_rule('/quiz', view_func=quiz.quiz, methods=['POST'])
app.add_url_rule('/quiz/<int:qid>', view_func=quiz.quiz_id, methods=['POST', 'GET'])
app.add_url_rule('/quiz/submit', view_func=quiz.submit_quiz, methods=['POST'])


#quiz->category
#second wale me question number jayega
#third wale me submit ho jaega