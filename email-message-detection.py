import random
from openai import OpenAI

decrement_value_for_legit_phrases = 3.3

client = OpenAI(
    api_key = "sk-None-tgdmWCo2Ge4XFK3dW8XPT3BlbkFJZrb594nsOoyvtdXqxqvY"
)

scam_phrases = {
    "Social security digits": 87, 
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
}

def context_matching(sentence, current_score, number_of_scams):

    prompt = '''Based on the dictionary can you recognize these phrases in the given sentence 
    and return it in the following format: if it is true or in the dictionary 
    [True, given sentence, scam_score], and it it is false and not in the dictionary return 
    [False, given sentence, 0] thats is all and nothing else. ensure given sentence is enclosed within quotations as a string 
    when returning return one or the other and no other phrase: '''

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

    scam_result_array[2] = current_score
               
    return scam_result_array

#context_matching("Can you give me the last 4 digits of your social security number", 45, 2)
#context_matching("We can give you a free trial ummm, uh you only need to pay us a small processing fee", 45, 2)
#context_matching("How has your day been so far Mr. Smith?", 45, 2)