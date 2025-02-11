# Using flask to make an api 
from flask import Flask, jsonify, request 
import pandas as pd
from prophet import Prophet


  
# creating a Flask app 
app = Flask(__name__) 
  
# on the terminal type: curl http://127.0.0.1:5000/ 
@app.route('/', methods = ['GET', 'POST']) 
def home(): 
    if(request.method == 'GET'): 
        data = "hello world"
        return jsonify({'data': data}) 
  

# driver function 
if __name__ == '__main__': 
  
    app.run(debug = True) 