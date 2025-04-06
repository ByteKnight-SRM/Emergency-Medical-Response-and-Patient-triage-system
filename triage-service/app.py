# app.py
from flask import Flask, request, jsonify
import pickle
import numpy as np

app = Flask(__name__)

# Load pre-trained model (Assuming you have one)
# For demonstration, we'll mock the prediction
# model = pickle.load(open('triage_model.pkl', 'rb'))

@app.route('/triage', methods=['POST'])
def triage():
    data = request.json
    # Example input features
    # features = [data['age'], data['heart_rate'], data['blood_pressure'], ...]
    # prediction = model.predict([features])[0]
    
    # Mock prediction logic
    severity = 'Green'  # Replace with actual model prediction
    if data['heart_rate'] > 100 or data['blood_pressure'] > 140:
        severity = 'Red'
    elif data['heart_rate'] > 80 or data['blood_pressure'] > 120:
        severity = 'Yellow'
    
    return jsonify({'severity': severity})

if __name__ == '__main__':
    app.run(port=5001, debug=True)
