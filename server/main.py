from flask import Flask, jsonify, request
from flask_cors import CORS

from openai import OpenAI
from dotenv import load_dotenv
import os

import nltk
nltk.download('punkt')
from nltk.tokenize import sent_tokenize

from calculation import context_matching

from dotenv import dotenv_values
config = dotenv_values(".env")

app = Flask(__name__)
CORS(app, origins="https://watchdogcyber.live")  # Update CORS configuration here

load_dotenv()

api_key = os.getenv("OPENAI_API_KEY")

client = OpenAI(
    api_key=config["OPENAI_API_KEY"]
)

@app.route('/myip', methods=['GET'])
def my_ip():
    return request.headers.getlist("X-Forwarded-For")[0]

@app.route('/', methods=['GET'])
def home():
    return jsonify(
        {
            "creators": ['vivek', 'harishan', 'sam', 'prasun']
        }
    )

@app.route('/', methods=['POST'])
def receive_data():
    data = request.json
    sentence = data['sentence']
    score = data['score']
    num_scams = data['num_scams']
    context_matched = context_matching(sentence, score, num_scams)
    response = {
        'isScam': context_matched[0],
        'sentence': context_matched[1],
        'newScore': context_matched[2]
    }
    return
