from flask import Flask,jsonify,request,session
import uuid,random
import pymongo ,urllib
from pymongo import MongoClient
from passlib.hash import pbkdf2_sha256


client = pymongo.MongoClient("mongodb+srv://Jonathan:"+ urllib.parse.quote("Jonathan@123") +"@cluster0.naqqj.mongodb.net/QUIZAPP?retryWrites=true&w=majority")
db = client["test"]
collection=db["test"]
question=''
score=0
class User:

    def start_session(self,user):
        session["logged_in"]=True
        session["user"]=user
        return jsonify(user),200


    def login(self):
        user=collection.find_one({"email":request.form.get("email")})

        if user and pbkdf2_sha256.verify(request.form.get("password"),user["password"]):
            return self.start_session(user)
            
        else:
            return jsonify({"error":"Invalid login Credentials"}),401

    def signup(self):
        user={
            "_id":uuid.uuid4().hex,
            "name":request.form.get("name"),
            "email":request.form.get("email"),
            "password":pbkdf2_sha256.encrypt(request.form.get("password")),
            "isadmin":False,
        }

        if collection.find_one({"email":user["email"]}):
            return jsonify({"error":"User already exits"}),400
        if collection.insert_one(user):
            return jsonify(user),200

        return jsonify({"error":"SignUp failed"}),400


    def signout(self):
        session.clear()

class Quiz: 
    
    def __init__(self):   
        
        self.category=''
        

    def eval_question(self,quiz_id):
        global question
        global score    
        if  True:
            score=score+1
            difficulty=min(3,question["difficulty"]+1)
        else :
            difficulty=max(1,question["difficulty"]-1)
        
        return difficulty

    def get_score(self):
        global score
        final_score=score
        score=0
        score_dic={
            "_id":uuid.uuid4().hex,
            "email":session["user"]["email"],
            "score":final_score

        }
        if collection.insert_one(score_dic):
            return jsonify(score_dic)
        

          
    def ren_question(self,difficulty):
        global question
        count=collection.count({"category":question["category"],"difficulty":difficulty})
        if count>0:
            r = random.randrange(0,count-1)
            question=collection.find({"category":question["category"],"difficulty":difficulty}).limit(1).skip(r)
            for q in question:
                question=q
            return jsonify(question),200
        else:
            return jsonify({"error":"Question does not exist in given category"}),400



    def ren_first_question(self):
        global question
        self.category=request.form.get("category")
        count=collection.count({"category":request.form.get("category")})
        if count>0:
            r = random.randrange(0,count-1)
            question=collection.find({"category":request.form.get("category")}).limit(1).skip(r)
            for q in question:
                question=q
            return jsonify(question),200
        else:
            return jsonify({"error":"Question does not exist in given category"}),400

        