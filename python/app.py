import json
import matplotlib.pyplot as plt
import base64
import io
import requests
import openai
from prophet import Prophet
import pandas as pd
from flask import Flask, jsonify, request
import matplotlib
matplotlib.use('Agg')  # Use non-interactive backend


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

        # get time fro data
        periods = data['periods']

        # Train Prophet Model
        model = Prophet()
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


OPENAI_API_KEY = "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"

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

        # Construct the messages list with explicit mention of JSON
        # prompt = [
        #     {
        #         "role": "system",
        #         "content": "You are an advanced AI assistant skilled in data analysis.  Always return your findings in a well-structured JSON format."
        #     },
        #     {
        #         "role": "user",
        #         "content": "Please analyze the following dataset to extract meaningful insights. Depending on the type of data, your analysis should cover:"
        #     },
        #     {
        #         "role": "user",
        #         "content": "- **Time-Series Data**: Identify trends over time, seasonality, and provide potential forecasting insights."
        #     },
        #     {
        #         "role": "user",
        #         "content": "- **Financial Data**: Evaluate revenue streams, analyze expenses, and calculate profitability metrics."
        #     },
        #     {
        #         "role": "user",
        #         "content": "- **Customer/Sales Data**: Summarize customer purchase behavior, product demand trends, and identify key customer segments."
        #     },
        #     {
        #         "role": "user",
        #         "content": "- **Operational Data**: Uncover inefficiencies, highlight patterns, and provide recommendations for process improvements."
        #     },
        #     {
        #         "role": "user",
        #         "content": "- **Text Data**: Conduct sentiment analysis, extract key topics, and identify emerging themes."
        #     },
        #     {
        #         "role": "user",
        #         "content": "Ensure that all insights are presented in a clear, concise JSON format, and include relevant visualizations or statistical summaries if applicable."
        #     },
        #     {
        #         "role": "user",
        #         "content": f"Data to analyze: {json.dumps(data)}"
        #     }
        # ]
        prompt = [
            {
                "role": "system",
                "content": (
                    "You are an advanced AI assistant skilled in data analysis and visualization. "
                    "Your task is to analyze datasets and provide structured insights in JSON format. "
                    "For each analysis, suggest an appropriate visualization type (e.g., line chart, bar chart, scatter plot). "
                    "Ensure the output includes labeled data for easy plotting."
                )
            },
            {
                "role": "user",
                "content": "Analyze the following dataset and provide meaningful insights. Your analysis should cover:"
            },
            {
                "role": "user",
                "content": "- **Time-Series Data**: Identify trends, seasonality, and cyclical patterns. Suggest a line chart or area plot."
            },
            {
                "role": "user",
                "content": "- **Financial Data**: Evaluate revenue trends, expense breakdowns, and profitability metrics. Suggest bar charts or pie charts."
            },
            {
                "role": "user",
                "content": "- **Customer/Sales Data**: Identify purchase behavior, product demand trends, and customer segmentation. Suggest scatter plots or heatmaps."
            },
            {
                "role": "user",
                "content": "- **Operational Data**: Highlight process inefficiencies, workload distribution, and performance metrics. Suggest histograms or bar charts."
            },
            {
                "role": "user",
                "content": "- **Text Data**: Conduct sentiment analysis, extract key topics, and identify emerging themes. Suggest word clouds or bar charts."
            },
            {
                "role": "user",
                "content": (
                    "Ensure that all insights are presented in a structured JSON format. "
                    "For each insight, include a recommended visualization type and properly formatted data for graphing. "
                    "The output should follow this structure:\n\n"
                    "{\n"
                    '  "insights": [...],\n'
                    '  "visualizations": [\n'
                    "    {\n"
                    '      "title": "Graph Title",\n'
                    '      "chart_type": "bar",\n'
                    '      "x_label": "Category",\n'
                    '      "y_label": "Value",\n'
                    '      "data": [{"x": "Label1", "y": 123}, {"x": "Label2", "y": 456}]\n'
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
        client = openai.OpenAI(api_key=OPENAI_API_KEY)
        response = client.chat.completions.create(
            model="gpt-4o",
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


if __name__ == '__main__':
    app.run(debug=True, port=5000)
