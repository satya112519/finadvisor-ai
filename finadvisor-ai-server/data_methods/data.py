import pandas as pd
from flask import Flask, request, jsonify
def read_data_file(file_name):
    df = pd.read_csv(file_name)
    return df

def get_users():
    df = read_data_file('data/users.csv')
    return df

def get_transactions_data():
    file_name = 'data/data.csv'
    df = read_data_file(file_name)
    df['EntityID'] = df['EntityID'].apply(int)
    df = df.applymap(str)
    return df

def check_valid_entity(user_id):
    df = get_users()
    df = df[df['UserID']==user_id]
    if df.empty:
        return {"status":"false"}
    data = df.iloc[0].to_json()
    return {"status":"true", "data": data}

def get_user_name(user_id):
    df = get_users()
    df = df[df['UserID']==user_id]
    data = df.iloc[0]['FirstName']+" "+df.iloc[0]['LastName']
    return data