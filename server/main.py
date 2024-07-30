from flask import Flask, jsonify, request
from flask_cors import cross_origin, CORS

from openai import OpenAI
from dotenv import load_dotenv
import os

import nltk
nltk.download('punkt')
from nltk.tokenize import sent_tokenize

from calculation import context_matching

app = Flask(__name__)
CORS(app)

load_dotenv()

api_key = os.getenv("OPENAI_API_KEY")


client = OpenAI(
    api_key = api_key
)

scam_phrases = {
    "scan": 90,
    "Social security digits": 87, 
    "What is your SIN number": 85,
    "You've won a prize": 76,
    "Verify your account information": 32,
    "Urgent action required": 81,
    "This is not a scam": 83,
    "Call this number immediately": 80,
    "Your account has been compromised": 99,
    "Exclusive deal just for you": 44,
    "Pre-approved loan": 95,
    "Click this link to claim your reward": 83,
    "Lower your interest rates": 70,
    "You owe back taxes": 97,
    "Free trial, just pay shipping": 91,
    "Suspicious activity detected": 48,
    "Your computer has a virus": 92,
    "We need your personal information": 95,
    "Special promotion, act now": 60,
    "Urgent message from the IRS": 100,
    "You have unpaid fines": 76,
    "Confirm your password": 100,
    "Your bank account is at risk": 90,
    "Immediate action required: update your payment information": 90,
    "This is your final notice. Your car warranty is about to expire": 68,
    "You have an unclaimed inheritance. Contact us to claim it": 100,
    "Your subscription is about to expire. Renew now": 33,
    "Complete this survey to win a gift card": 20,
    "Immediate response required": 76,
    "You have a package waiting for you": 51,
    "We have a job offer for you": 100,
    "Verify your email to continue": 36,
    "Remote access to users computer": 94,
}



@app.route('/', methods=['GET'])
def home(): 
    return jsonify(
        {
            "users": ['vivek', 'harishan', 'manit']
        }
    )

@app.route('/', methods=['POST'])
def receive_data(): 
    data = request.json
    sentence = data['sentence']
    score = data['score']
    num_scams = data['num_scams']
    context_matched = context_matching(sentence, score, num_scams)
    response = {'isScam': context_matched[0], 
                    'sentence': context_matched[1], 
                    'newScore': context_matched[2]
                } 
    return jsonify(response)

'''
json {
    transcript: full transcript
}

send back: {
    score: 
    transcript with strong tags around 'scammy' sentences 
}
'''
@app.route('/message', methods=['POST'])
def parse_transcribe(): 
    data = request.json
    transcript = data['transcript'] 
    parsed = sent_tokenize(transcript)
    score=0
    num_scams = 0
    scanned_transcript = []
    for sentence in parsed: 
        context = context_matching(sentence, score, num_scams)
        score = context[2]
        if (context[0]): 
            num_scams += 1
            sentence = '<strong>' + sentence + '</strong>'
        scanned_transcript.append(sentence) 
        
    scanned_transcript = ' '.join(scanned_transcript)
    response = {
        'transcript': scanned_transcript, 
        'score': score
    }
    return jsonify(response)



if __name__ == '__main__': 
    app.run(debug=True)