import random

scam_phrases = {
    "You've won a prize": 90,
    "Act now, limited time offer": 80,
    "Verify your account information": 85,
    "Urgent action required": 75,
    "Congratulations, you've been selected": 70,
    "This is not a scam": 95,
    "Call this number immediately": 80,
    "Your account has been compromised": 85,
    "Exclusive deal just for you": 70,
    "Pre-approved loan": 65,
    "Click this link to claim your reward": 95,
    "Lower your interest rates": 60,
    "You owe back taxes": 90,
    "Free trial, just pay shipping": 70,
    "You have an outstanding warrant": 85,
    "Suspicious activity detected": 80,
    "Payment required immediately": 85,
    "Your computer has a virus": 75,
    "We need your personal information": 90,
    "Special promotion, act now": 65,
    "Urgent message from the IRS": 95,
    "You have unpaid fines": 80,
    "This is a limited time offer": 70,
    "Confirm your password": 85,
    "Your bank account is at risk": 90
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
    email_sentence_list = message.split(".")
    for sentence in email_sentence_list:
        sentence = sentence.strip()
        result = context_matching(sentence)
        if result[0]:
            print(f"Scam detected: {result[1]} with a score of {result[2]}")
        else:
            print('Probably Not a scam. Sentence:', result[1])

def context_matching(sentence):
    scam_keys = list(scam_phrases.keys())
    random_index = random.randint(0, len(scam_keys) - 1)
    random_scam = scam_keys[random_index]
    scam_score = scam_phrases[random_scam]
    random_outcome = random.random() < 0.5

    return [True, random_scam, scam_score] if random_outcome else [False, sentence]

# Call the scam_sentence_looper function with sample_email
scam_sentence_looper(sample_email)

# Call the scam_sentence_looper function with sample_text_message (if you want to test with text messages)
scam_sentence_looper(sample_text_message)
