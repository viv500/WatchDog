from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, origins='*')

@app.route('/', methods=['GET'])
def home(): 
    return jsonify(
        {
            "users": ['vivek', 'harishan', 'manit']
        }
    )

@app.route('/', methods=['POST'])
def receive_data(): 
    data = request.json
    print(data)
    return jsonify({'status': 'success', 'received': data})

if __name__ == '__main__': 
    app.run(debug=True)