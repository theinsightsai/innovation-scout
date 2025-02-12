from flask import Flask, jsonify, request
import pandas as pd
from prophet import Prophet

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
        df.columns = ['ds', 'y']  # Prophet requires 'ds' (date) and 'y' (value)
        
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

if __name__ == '__main__':
    app.run(debug=True, port=5000)
