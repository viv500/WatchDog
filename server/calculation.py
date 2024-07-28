import random
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from openai import OpenAI
from variables import scam_phrases
from dotenv import load_dotenv
import os

decrement_value_for_legit_phrases = 3.3

# Load environment variables from .env file
load_dotenv()

api_key = os.getenv("OPENAI_API_KEY")

client = OpenAI(
    api_key = "sk-None-tgdmWCo2Ge4XFK3dW8XPT3BlbkFJZrb594nsOoyvtdXqxqvY"
)


def context_matching(sentence, current_score, number_of_scams):

    prompt = '''Based on the dictionary can you recognize these phrases in the given sentence
      and return it in the following format: based on the context determine the most 
      
      
      simmillerly 
      
      
      matched message to the dictionary and if it is true or in the dictionary [True, given sentence, scam_score], and it it is false and not in the dictionary return [false, given sentence] thats is all and nothing else. when returning return one or the other and no other phrase:
'''

    chat_completion = client.chat.completions.create(
    
    messages=[
            {"role": "user", "content": prompt + str(scam_phrases) + sentence}],

            model="gpt-3.5-turbo"

    )

    scam_result_array = chat_completion.choices[0].message.content.strip()

    scam_result_array = eval(scam_result_array)

    if scam_result_array[0]:
        current_score = (((current_score * number_of_scams) + scam_result_array[2]) / (number_of_scams + 1))
    else:
        current_score -= decrement_value_for_legit_phrases

    scam_result_array = list(scam_result_array)
    scam_result_array[2] = current_score
               
    return scam_result_array

# print(context_matching("Can you give me the last 4 digits of your social security number", 45, 2))
# print(context_matching("We can give you a free trial ummm, uh you only need to pay us a small processing fee", 45, 2))
# print(context_matching("How has your day been so far Mr. Smith?", 45, 2))