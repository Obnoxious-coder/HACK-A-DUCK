import pymongo ,urllib
from pymongo import MongoClient
import os
import secrets
from flask import Flask,render_template, url_for, flash, redirect, request, abort
#from forms import RegistrationForm, LoginForm
from flask_bcrypt import Bcrypt
from models import User,Quiz

app = Flask(__name__)
app.config['SECRET_KEY'] = '7a92db426dc5bf58777aa19acdaa2044'
client = pymongo.MongoClient("mongodb+srv://Jonathan:"+ urllib.parse.quote("Jonathan@123") +"@cluster0.naqqj.mongodb.net/QUIZAPP?retryWrites=true&w=majority")
db = client["test"]
collection=db["test"]
bcrypt=Bcrypt(app)

@app.route("/")
def home():
    return "<h1>home</h1>"


@app.route("/register",methods=["POST","GET"])
def register():
    return User().signup()


@app.route("/login",methods=["POST","GET"])
def login():
    
    return User().login()


@app.route("/quiz",methods=["POST","GET"])
def quiz():
    
    return Quiz().ren_first_question()


@app.route("/quiz/<int:quiz_id>",methods=["POST","GET"])
def quizid(quiz_id):
    if quiz_id>=10:
        return Quiz().get_score()
    else:    
        diff=Quiz().eval_question(quiz_id)    
        return Quiz().ren_question(diff)
    


if __name__ == '__main__':
    app.run(debug=True)
