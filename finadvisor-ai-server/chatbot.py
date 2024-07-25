import nltk
nltk.download('punkt')
nltk.download('wordnet')
from nltk.stem import WordNetLemmatizer
lemmatizer = WordNetLemmatizer()
import pickle
import numpy as np
import datefinder
import pandas as pd

from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from tensorflow.keras.models import load_model
import json
import random

from data_methods.data import check_valid_entity, get_transactions_data, get_user_name

app = FastAPI()

# Allow CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Adjust according to your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = load_model('chatbot_model.h5')
intents = json.loads(open('intents.json', encoding="utf8").read())
words = pickle.load(open('words.pkl', 'rb'))
classes = pickle.load(open('classes.pkl', 'rb'))

def clean_up_sentence(sentence):
    sentence_words = nltk.word_tokenize(sentence)
    sentence_words = [lemmatizer.lemmatize(word.lower()) for word in sentence_words]
    return sentence_words

def bow(sentence, words, show_details=True):
    sentence_words = clean_up_sentence(sentence)
    bag = [0]*len(words)
    for s in sentence_words:
        for i, w in enumerate(words):
            if w == s:
                bag[i] = 1
                if show_details:
                    print("found in bag: %s" % w)
    return np.array(bag)

def predict_class(sentence, model):
    p = bow(sentence, words, show_details=False)
    res = model.predict(np.array([p]))[0]
    ERROR_THRESHOLD = 0.25
    results = [[i, r] for i, r in enumerate(res) if r > ERROR_THRESHOLD]
    results.sort(key=lambda x: x[1], reverse=True)
    return_list = []
    for r in results:
        return_list.append({"intent": classes[r[0]], "probability": str(r[1])})
    return return_list

def getTransactionDetails(msg, entity_id):
    df = get_transactions_data()
    df = df[df['EntityID'] == entity_id]
    matches = datefinder.find_dates(msg)

    if 'mastercard' in msg.lower():
        df = df[df['CardTypeAbbrev'] == 'MasterCard']
    elif 'visa' in msg.lower():
        df = df[df['CardTypeAbbrev'] == 'VISA']

    if 'sales' in msg.lower():
        df = df[df['Category'] == 'SALES']
    elif 'refunds' in msg.lower() or 'chargebacks' in msg.lower() or 'returns' in msg.lower():
        df = df[df['Category'] == 'REFUNDS']

    if 'success' in msg.lower():
        df = df[df['TransactionStatus'] == 'SUCCESS']
    elif 'failure' in msg.lower() or 'withheld' in msg.lower():
        df = df[df['TransactionStatus'] == 'FAILED']

    if 'settlement' in msg.lower():
        df = df[df['SettledDate'] == '12/13/2022']

    if 'number' in msg.lower() or 'count' in msg.lower() or 'many' in msg.lower():
        result = df.shape[0]
        return result
    elif 'fee' in msg.lower():
        df['FeesAmount'] = df['FeesAmount'].apply(float)
        result = df['FeesAmount'].sum()
        return result
    elif 'total' in msg.lower() or 'amount' in msg.lower() or 'much' in msg.lower() or 'details' in msg.lower():
        df['Amount'] = df['Amount'].apply(float)
        result = df['Amount'].sum()
        return result
    return df.to_json()

def getResponse(msg, ints, intents_json, entity_id):
    tag = ints[0]['intent']
    list_of_intents = intents_json['intents']
    for i in list_of_intents:
        if i['tag'] == tag:
            if tag == 'transaction_details':
                result = getTransactionDetails(msg, entity_id)
            else:
                print(tag)
                result = random.choice(i['responses'])
                if tag == 'greeting':
                    result = { "text": result, "user": "admin", "buttons": ["Personal Budgeting", "Portfolio Management", "Investments Recommendation", "Savings Optimization", "Debt Management", "Retirement Planning", "Expense Tracking", "Fraud Detection"]}
                
            if tag == 'options':
                entity_name = get_user_name(entity_id)
                result = result.replace("<Merchant_Name>", entity_name)
            break
    return result

def chatbot_response(msg, entity_id):
    ints = predict_class(msg, model)
    res = getResponse(msg, ints, intents, entity_id)
    return res

class Query(BaseModel):
    query: str
    user_id: str

@app.post("/process_query")
async def process_query(query: Query):
    response = chatbot_response(query.query, query.user_id)
    if isinstance(response, dict):
        return response
    return {"user": "admin", "text": response}

class LoginData(BaseModel):
    user_id: str

@app.post("/login")
async def login(data: LoginData):
    response = check_valid_entity(data.user_id)
    return response

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=5400)