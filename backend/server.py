from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import json
from json import JSONEncoder
import numpy

app = Flask(__name__)
CORS(app)
class NumpyArrayEncoder(JSONEncoder):
    def default(self, obj):
        if isinstance(obj, numpy.ndarray):
            return obj.tolist()
        return JSONEncoder.default(self, obj)
    
@app.route('/calculate', methods=['POST'])
def calculate():
    svm = joblib.load("svm.joblib")
    input1 = float(request.json['input1'])
    input2 = float(request.json['input2'])
    input3 = float(request.json['input3'])
    # make prediction using the loaded model & the data from the POST request body and return the result in JSON format 
    prediction = svm.predict([[input1,input2,input3]])
    str1 = ""
    for ele in prediction:
        str1 += ele
        print(ele)
    result = json.dumps(str1, cls=NumpyArrayEncoder)
    return jsonify({"result": result})

if __name__ == '__main__':
    app.run(debug=True)
