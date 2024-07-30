from flask import Flask, jsonify, request
from flask_cors import CORS

from openai import OpenAI

import nltk
nltk.download('punkt')
from nltk.tokenize import sent_tokenize

from calculation import context_matching

from dotenv import dotenv_values
config = dotenv_values(".env")

app = Flask(__name__)
CORS(app)

client = OpenAI(
    api_key = config["OPENAI_API_KEY"]
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
