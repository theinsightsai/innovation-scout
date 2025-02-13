from flask import Flask, jsonify, request
import pandas as pd
from prophet import Prophet
import requests
import json

app = Flask(__name__)


@app.route('/', methods=['GET'])
def home():
    return jsonify({'message': 'Flask API Running'})


@app.route('/forecast', methods=['POST'])
def forecast():
    try:
        # Get JSON data from request
        data = request.get_json()
        # Convert to DataFrame
        df = pd.DataFrame(data['data'])
        # Prophet requires 'ds' (date) and 'y' (value)
        df.columns = ['ds', 'y']

        # Train Prophet Model
        model = Prophet()
        model.fit(df)

        # Predict next 30 days
        future = model.make_future_dataframe(periods=30)
        forecast = model.predict(future)

        # Return predictions
        return jsonify(forecast[['ds', 'yhat', 'yhat_lower', 'yhat_upper']].to_dict(orient="records"))

    except Exception as e:
        return jsonify({'error': str(e)})


# API_KEY = "sk-ff6bc537241a48b58d155a6bb8afe251"
# DEEPSEEK_URL = "https://api.deepseek.com/chat/completions"
BLACKBOX_URL = "https://api.blackbox.ai/api/chat"

@app.route('/data', methods=['POST'])
# def analyze_json_data():
#     try:
#         # Get JSON request data
#         req_data = request.get_json()
#         if not req_data or 'data' not in req_data or 'prompt' not in req_data:
#             return jsonify({"error": "Invalid request. 'data' and 'prompt' are required."}), 400
#         data = req_data['data']
#         user_prompt = req_data['prompt']
#         # Prepare DeepSeek API payload
#         messages = [
#             {"role": "system", "content": "You are a financial analysis assistant."},
#             {"role": "user", "content": f"Analyze the following data for {user_prompt}: {data}"}
#         ]
#         payload = {
#             "model": "deepseek-chat",  # Use 'deepseek-reasoner' if needed
#             "messages": messages,
#             "stream": False  # Set to True if streaming responses are needed
#         }
#         headers = {
#             "Content-Type": "application/json",
#             "Authorization": f"Bearer {API_KEY}"
#         }
#         # Send request to DeepSeek API
#         response = requests.post(DEEPSEEK_URL, json=payload, headers=headers)
#         if response.status_code == 200:
#             result = response.json()
#             return jsonify({"analysis": result.get('choices', [{}])[0].get('message', {}).get('content', 'No response')})
#         else:
#             return jsonify({"error": "API request failed", "status_code": response.status_code, "details": response.text}), response.status_code
#     except Exception as e:
#         return jsonify({"error": "Internal Server Error", "details": str(e)}), 500
def analyze_json_data():
    try:
        # Get JSON request data
        req_data = request.get_json()

        # Validate input
        if not req_data or 'data' not in req_data or 'prompt' not in req_data:
            return jsonify({"error": "Invalid request. 'data' and 'prompt' are required."}), 400

        data = req_data['data']
        user_prompt = req_data['prompt']

        # Prepare Blackbox AI payload
        payload = json.dumps({
            "messages": [
                {
                    "content": f"Analyze the following data for {user_prompt}: {json.dumps(data)}",
                    "role": "user"
                }
            ],
            "model": "deepseek-ai/DeepSeek-V3",
            "max_tokens": "1024"
        })

        headers = {
            "Content-Type": "application/json"
        }

        # Send request to Blackbox AI API
        response = requests.post(BLACKBOX_URL, headers=headers, data=payload)

        if response.status_code == 200:
            result = response.json()
            return jsonify({"analysis": result.get("choices", [{}])[0].get("message", {}).get("content", "No response")})
        else:
            return jsonify({"error": "API request failed", "status_code": response.status_code, "details": response.text}), response.status_code

    except Exception as e:
        return jsonify({"error": "Internal Server Error", "details": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True, port=5000)
