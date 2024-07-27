import torch
from transformers import BertTokenizer, BertForSequenceClassification
from transformers import Trainer, TrainingArguments
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score
from torch.utils.data import DataLoader, Dataset
import pandas as pd

# Sample data
data = {
    "text": [
        "You've won a prize", "Act now, limited time offer", "Verify your account information",
        "Urgent action required", "Congratulations, you've been selected", "This is not a scam",
        "Call this number immediately", "Your account has been compromised", "Exclusive deal just for you",
        "Pre-approved loan", "Click this link to claim your reward", "Lower your interest rates",
        "You owe back taxes", "Free trial, just pay shipping", "You have an outstanding warrant",
        "Suspicious activity detected", "Payment required immediately", "Your computer has a virus",
        "We need your personal information", "Special promotion, act now", "Urgent message from the IRS",
        "You have unpaid fines", "This is a limited time offer", "Confirm your password",
        "Your bank account is at risk"
    ],
    "label": [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
}

df = pd.DataFrame(data)

# Add non-scam examples
non_scam_data = {
    "text": [
        "Meeting at 3 PM", "Dinner at 7 PM", "Happy Birthday!", "Project deadline extended",
        "Looking forward to our call", "Thank you for your purchase", "Your order has been shipped",
        "Reminder: dentist appointment tomorrow", "Can you send me the report?", "Let's catch up soon!"
    ],
    "label": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
}

df_non_scam = pd.DataFrame(non_scam_data)
df = pd.concat([df, df_non_scam])

# Split data
train_texts, test_texts, train_labels, test_labels = train_test_split(df["text"], df["label"], test_size=0.2, random_state=42)

# Tokenize data
tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')

class ScamDataset(Dataset):
    def __init__(self, texts, labels, tokenizer, max_len=128):
        self.texts = texts
        self.labels = labels
        self.tokenizer = tokenizer
        self.max_len = max_len

    def __len__(self):
        return len(self.texts)

    def __getitem__(self, idx):
        text = self.texts[idx]
        label = self.labels[idx]
        encoding = self.tokenizer.encode_plus(
            text,
            add_special_tokens=True,
            max_length=self.max_len,
            return_token_type_ids=False,
            padding='max_length',
            truncation=True,
            return_attention_mask=True,
            return_tensors='pt'
        )
        return {
            'input_ids': encoding['input_ids'].flatten(),
            'attention_mask': encoding['attention_mask'].flatten(),
            'labels': torch.tensor(label, dtype=torch.long)
        }

train_dataset = ScamDataset(train_texts.tolist(), train_labels.tolist(), tokenizer)
test_dataset = ScamDataset(test_texts.tolist(), test_labels.tolist(), tokenizer)

# Load pre-trained BERT model
model = BertForSequenceClassification.from_pretrained('bert-base-uncased', num_labels=2)

# Training arguments
training_args = TrainingArguments(
    output_dir='./results',
    num_train_epochs=3,
    per_device_train_batch_size=8,
    per_device_eval_batch_size=8,
    warmup_steps=500,
    weight_decay=0.01,
    logging_dir='./logs',
    logging_steps=10,
)

# Create Trainer instance
trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=train_dataset,
    eval_dataset=test_dataset,
    compute_metrics=lambda p: {
        'accuracy': accuracy_score(p.label_ids, p.predictions.argmax(-1)),
        'precision': precision_score(p.label_ids, p.predictions.argmax(-1)),
        'recall': recall_score(p.label_ids, p.predictions.argmax(-1)),
        'f1': f1_score(p.label_ids, p.predictions.argmax(-1)),
    }
)

# Train model
trainer.train()

# Evaluate model
results = trainer.evaluate()
print(f"Results: {results}")
