from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, origins='*')

@app.route('/', methods=['GET', 'POST'])
def home(): 
    return jsonify(
        {
            "users": ['vivek', 'harishan', 'manit']
        }
    )


if __name__ == '__main__': 
    app.run(debug=True)