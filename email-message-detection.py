import random
from openai import OpenAI

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

sample_email = '''Subject: Important Account Notice - Action Required

Dear Vivek,

We hope this email finds you well. As part of our regular security checks, we have detected some unusual activity in your [Bank/Service] account. To ensure the safety and integrity of your account, we require you to verify your account information within the next 48 hours.

What you need to do:

Click on the secure link below to log in to your account.
Follow the on-screen instructions to confirm your account details.
If you do not complete this verification process within the given timeframe, your account may be temporarily suspended for your protection.
Secure Account Verification Link:

www.company.com/employee/wellness

We apologize for any inconvenience this may cause and appreciate your prompt attention to this matter. Our goal is to provide you with the best service and ensure the highest level of security for your account.

If you have any questions or need further assistance, please do not hesitate to contact our customer support team at [Fake Support Email] or call us at [Fake Support Number].

Thank you for your cooperation.

Sincerely,

Albert Johnson
Security Team
The Company INC.'''

sample_text_message = '''Your package is scheduled for delivery but we need to confirm your shipping address to ensure timely delivery. Please verify your address by clicking the link below:

This confirmation is required to avoid any delays or issues with your delivery. If we do not receive a response within 24 hours, your package will be returned to the sender.

Thank you for your prompt attention to this matter.'''

def scam_sentence_looper(message):
    email_sentence_list = message.split(". ")
    for sentence in email_sentence_list:
        sentence = sentence.strip()
        result = context_matching(sentence)
        if result[0]:
            print(f"Scam detected: {result[2]} with a score of {result[3]}. Sentence: {result[1]}")
        else:
            print('Probably Not a scam. Sentence:', result[1])

def context_matching(sentence):
    scams = list(scam_phrases.keys())
    random_scam = random.choice(scams)
    scam_score = scam_phrases[random_scam]
    random_outcome = random.choice([True, False])

    prompt = '''Based on the dictionary can you recognize these phrases in the given sentence 
    and return it in the following format: if it is true or in the dictionary 
    [True, given sentence, scam_score], and it it is false and not in the dictionary return [false, given sentence] thats is all and nothing else. 
    when returning return one or the other and no other phrase:
 '''

    chat_completion = client.chat.completions.create(
    

    messages=[
            {"role": "user", "content": prompt + str(scam_phrases) + sentence}],

            model="gpt-3.5-turbo"

    )

    scam_result_array = chat_completion.choices[0].message.content.strip()

                    
    print(scam_result_array)

# Call the scam_sentence_looper function with sample_email
#scam_sentence_looper(sample_email)

# Call the scam_sentence_looper function with sample_text_message (if you want to test with text messages)
#scam_sentence_looper(sample_text_message)


context_matching("Can you give me the last 4 digits of your social security number")
context_matching("We can give you a free trial ummm, uh you only need to pay us a small processing fee")
context_matching("How has your day been so far Mr. Smith?")

