from flask import Flask, request, jsonify
from flask_pymongo import PyMongo

app = Flask(__name__)
app.config['MONGO_URI'] = "mongodb://localhost:27017/quiz"
mongo = PyMongo(app)


import admin
app.add_url_rule('/admin', view_func=admin.admin, methods=['POST'])
app.add_url_rule('/category', view_func=admin.list_category, methods=['POST', 'GET'])



