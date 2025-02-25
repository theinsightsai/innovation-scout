import json
import matplotlib.pyplot as plt
import base64
import io
import requests
from openai import OpenAI
from prophet import Prophet
import pandas as pd
from flask import Flask, jsonify, request
import os
from dotenv import load_dotenv
import matplotlib
matplotlib.use('Agg')  # Use non-interactive backend


app = Flask(__name__)

load_dotenv()

OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')



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

        # get time fro data
        periods = data['periods']

        # Train Prophet Model
        model = Prophet(growth='linear',daily_seasonality=True,weekly_seasonality=True, yearly_seasonality=True)
        model.fit(df)

        # Predict
        future = model.make_future_dataframe(periods=periods, freq='D')
        forecast = model.predict(future)
        forecast_json = forecast[['ds', 'yhat', 'yhat_lower', 'yhat_upper']].to_dict(
            orient="records")
        
        fig = model.plot_components(forecast)
        
        # Convert the plot to a Base64 string
        img_bytes = io.BytesIO()
        fig.savefig(img_bytes, format='png')  # Save as PNG
        img_bytes.seek(0)
        img_base64 = base64.b64encode(img_bytes.getvalue()).decode(
            'utf-8')  # Convert to Base64

        # Close the plot to free memory
        plt.close(fig)
        
        # Return JSON response with forecast data & image
        return jsonify({
            'forecast': forecast_json,
            'plot': img_base64
        })

    except Exception as e:
        return jsonify({'error': str(e)})



@app.route('/data', methods=['POST'])
def analyze_json_data():
    try:
        # Get JSON request data
        req_data = request.get_json()

        # Validate input
        if not req_data or 'data' not in req_data or 'prompt' not in req_data:
            return jsonify({"error": "Invalid request. 'data' and 'prompt' are required."}), 400

        data = req_data['data']
        user_prompt = req_data['prompt']

        prompt = [
    {
        "role": "system",
        "content": (
            "You are an advanced AI assistant specializing in data analysis and visualization. "
            "Your task is to analyze datasets and generate structured insights in JSON format, "
            "with a corresponding visualization for each insight. "
            "Ensure all visualizations follow a standardized data format for easy graph rendering."
        )
    },
    {
        "role": "user",
        "content": "Analyze the following dataset and provide structured insights along with visualizations. "
                   "Each insight should contain a detailed explanation and a recommended chart with well-formatted data."
    },
    {
        "role": "user",
        "content": "- **Time-Series Data**: Identify trends, seasonality, and patterns. Use a line chart or area plot."
    },
    {
        "role": "user",
        "content": "- **Financial Data**: Analyze revenue, expenses, and profitability. Use bar charts or pie charts."
    },
    {
        "role": "user",
        "content": "- **Customer/Sales Data**: Identify purchase trends and segment customers. Use scatter plots or heatmaps."
    },
    {
        "role": "user",
        "content": "- **Operational Data**: Evaluate workload distribution and inefficiencies. Use histograms or bar charts."
    },
    {
        "role": "user",
        "content": "- **Text Data**: Conduct sentiment analysis, extract key topics, and identify emerging themes. Use word clouds or bar charts."
    },
    {
        "role": "user",
        "content": (
            "Each insight must contain:\n"
            "1. A brief summary explaining the finding.\n"
            "2. A visualization section containing:\n"
            "   - `chart_type`: The type of chart (bar, line, scatter, pie, heatmap, etc.).\n"
            "   - `x_label`: Label for the x-axis.\n"
            "   - `y_label`: Label for the y-axis.\n"
            "   - `data`: A list of objects with `{ \"x\": <value>, \"y\": <value> }` format for consistency.\n\n"
            "Ensure that all charts use the same data structure for easy rendering."
        )
    },
    {
        "role": "user",
        "content": (
            "The final JSON response should be structured like this:\n\n"
            "{\n"
            '  "insights": [\n'
            "    {\n"
            '      "summary": "Brief explanation of the insight.",\n'
            '      "visualization": {\n'
            '        "title": "Graph Title",\n'
            '        "chart_type": "bar",\n'
            '        "x_label": "Category",\n'
            '        "y_label": "Value",\n'
            '        "data": [\n'
            '          {"x": "Category 1", "y": 120},\n'
            '          {"x": "Category 2", "y": 300}\n'
            "        ]\n"
            "      }\n"
            "    }\n"
            "  ]\n"
            "}"
        )
    },
    {
        "role": "user",
        "content": f"Data to analyze: {json.dumps(data)}"
    }
]

        # Call OpenAI API (new method)
        client = OpenAI(api_key=OPENAI_API_KEY)
        response = client.chat.completions.create(
            model="gpt-4o-2024-08-06",
            messages=prompt,
            response_format={
                "type": "json_object"
            },
            temperature=0.0,
        )

        # Extract AI response
        result = response.choices[0].message.content
        # Convert JSON string to a proper JSON object
        parsed_result = json.loads(result)

        return jsonify(parsed_result)  # Return the parsed JSON object

    except Exception as e:
        return jsonify({"error": "Internal Server Error", "details": str(e)}), 500


@app.route('/sentiment-analysis', methods=['POST'])
def analyze_sentiment():
    try:
        req_data = request.get_json()
        data = req_data['data']
        
        client = OpenAI(api_key=OPENAI_API_KEY)
        response = client.chat.completions.create(
            model="gpt-4o-2024-08-06",
            messages=[
                {"role": "system", "content": "You are a sentiment analyzer. Analyze the sentiment as Positive, Negative, or Neutral."},
                {"role": "system", "content": "Always return only one word from these Positive, Negative, or Neutral."},
                {"role": "user", "content": f"Analyze the sentiment of the following text: '{data}'"}
            ],
            max_tokens=1
        )
        # print(response)
        sentiment = response.choices[0].message.content.strip()

        return jsonify({"sentiment": sentiment})

    except Exception as e:
        return jsonify({"error": "Internal Server Error", "details": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5001)
