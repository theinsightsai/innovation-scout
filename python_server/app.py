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
from bs4 import BeautifulSoup
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
                    "You are an AI specializing in data analysis and visualization. "
                    "Analyze datasets and generate structured insights in JSON format, "
                    "with a matching visualization for each insight using a standardized format."
                )
            },
            {
                "role": "user",
                "content": "Analyze the dataset and provide structured insights with visualizations. "
                        "Ensure each insight includes a summary and a well-formatted chart."
            },
            {
                "role": "user",
                "content": (
                    "- **Time-Series**: Identify trends and seasonality (line/area chart).\n"
                    "- **Financial Data**: Analyze revenue, expenses, and profitability (bar/pie chart).\n"
                    "- **Sales Data**: Identify purchase trends and segments (scatter/heatmap).\n"
                    "- **Operations**: Evaluate inefficiencies and workload (histogram/bar chart).\n"
                    "- **Text Data**: Perform sentiment analysis and key topic extraction (word cloud/bar chart)."
                )
            },
            {
                "role": "user",
                "content": (
                    "Each insight must contain:\n"
                    "1. A summary of findings.\n"
                    "2. A visualization with:\n"
                    "   - `chart_type`: (bar, line, scatter, pie, heatmap, etc.).\n"
                    "   - `x_label`, `y_label`: Axis labels.\n"
                    "   - `data`: List of `{ \"x\": <value>, \"y\": <value> }` objects for consistency."
                )
            },
            {
                "role": "user",
                "content": (
                    "Format response as:\n"
                    "{\n"
                    '  "insights": [\n'
                    "    {\n"
                    '      "summary": "Insight explanation.",\n'
                    '      "visualization": {\n'
                    '        "title": "Graph Title",\n'
                    '        "chart_type": "bar",\n'
                    '        "x_label": "Category",\n'
                    '        "y_label": "Value",\n'
                    '        "data": [{"x": "A", "y": 120}, {"x": "B", "y": 300}]\n'
                    "      }\n"
                    "    }\n"
                    "  ]\n"
                    "}"
                )
            },
            {
                "role": "user",
                "content": f"Dataset: {json.dumps(data)}"
            },
            {
                "role": "user",
                "content": f"Additional user prompt: {user_prompt}"
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
    
   
   
def scrape_website(url):
    """Scrapes the given URL and collects all HTML tag data."""
    headers = {
        "User -Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
    }
    
    try:
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()  # Raise an error for bad responses (4xx, 5xx)
    except requests.RequestException as e:
        return {"error": f"Failed to fetch {url}", "details": str(e)}

    soup = BeautifulSoup(response.text, "html.parser")
    
    scraped_data = {"url": url, "data": {}}

    # Collect all tags and their text content
    for tag in soup.find_all(True):  # True finds all tags
        tag_name = tag.name
        tag_content = tag.get_text(strip=True)
        
        if tag_name not in scraped_data["data"]:
            scraped_data["data"][tag_name] = []
        
        scraped_data["data"][tag_name].append(tag_content)

    return scraped_data

def format_data_with_gpt(scraped_data):
    """Uses OpenAI GPT-4 to format and structure scraped data."""
    prompt = f"""
    Here is the raw scraped data: {json.dumps(scraped_data, indent=2)}
    Clean and structure this data into a well-organized JSON format.
    """
    
    client = OpenAI(api_key=OPENAI_API_KEY)
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": "You are a data processing assistant."},
            {"role": "user", "content": prompt}
        ],
        temperature=0
    )
    
    formatted_data = response.choices[0].message['content']
    return json.loads(formatted_data)

@app.route("/scrape", methods=["POST"])
def scrape():
   
    data = request.get_json()
    urls = data.get("urls", [])
    fields = data.get("fields", [])

    # Validate input
    if not urls or not isinstance(urls, list):
        return jsonify({"error": "Invalid input. Expecting a list of URLs."}), 400
    if not fields or not isinstance(fields, list):
        return jsonify({"error": "Invalid input. Expecting a list of fields."}), 400

    # Scrape data from multiple URLs
    scraped_results = {url: scrape_website(url) for url in urls}

    # Format data using GPT
    # formatted_results = format_data_with_gpt(scraped_results)

    return jsonify(scraped_results)

if __name__ == '__main__':
    app.run(debug=True, port=5001)
