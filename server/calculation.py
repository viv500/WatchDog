import random
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from openai import OpenAI
from variables import scam_phrases
from dotenv import load_dotenv
import os
import json

decrement_value_for_legit_phrases = 3.3

# Load environment variables from .env file
load_dotenv()

api_key = os.getenv("OPENAI_API_KEY")

client = OpenAI(
    api_key = api_key
)


def context_matching(sentence, current_score, number_of_scams):

    prompt1 = '''This is a dictionary with Scam-Phrase: Scam score key value pairs. '''
    prompt2 = "This is a sentence: "
    prompt3 = '''You need to context match the sentence to see if it resembles any of the Scam-Phrase keys in
    the dictionary. if you could match the sentence to a scam-phrase, return a JSON string '{"match": true, "sentence": "the sentence", "score": scam-score for that scam}'
    if you werent able to find any similarities between sentence and dictionary keys, return JSON string '{"match": false, "sentence": "the sentence", "score": 0}'
    make sure the sentence in the JSON is in string form'''


    chat_completion = client.chat.completions.create(
        messages=[
            {"role": "user", "content": prompt1 + str(scam_phrases) + prompt2 + sentence + prompt3}
        ],
        model="gpt-3.5-turbo"
    )

    scam_result_json = chat_completion.choices[0].message.content.strip()

    try:
        scam_result = json.loads(scam_result_json)
    except json.JSONDecodeError:
        print("Error decoding JSON: ", scam_result_json)
        return [False, sentence, current_score]

    if scam_result.get("match"):
        current_score = (((current_score * number_of_scams) + scam_result["score"]) / (number_of_scams + 1)) + ((number_of_scams)/2)
    else:
        current_score -= decrement_value_for_legit_phrases

    return [scam_result.get("match"), sentence, current_score]

# print(context_matching("Can you give me the last 4 digits of your social security number", 45, 2))
# print(context_matching("We can give you a free trial ummm, uh you only need to pay us a small processing fee", 45, 2))
# print(context_matching("How has your day been so far Mr. Smith?", 45, 2))