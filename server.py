#!flask/bin/python

from flask import jsonify
from flask import Flask
from flask import request
from flask import json
from flask.ext.pymongo import PyMongo

app = Flask(__name__)
mongo = PyMongo(app)

@app.route('/sanjose/orders', methods=['GET'])
def get_orders():
    orders = mongo.db.orders.find({})
    return jsonify({'orders': orders})


@app.route('/sanjose/orders/<int:order_id>', methods=['GET'])
def get_task(order_id):
    return jsonify({'order': 'order yet to do dev of this part'})

@app.route('/sanjose/orders', methods=['POST'])
def create_task():
    print request.json
    input_json = request.json 
    order = {
        "coffeename": request.json['coffeename'],
        "mugsize": request.json['mugsize']
    }
    tasks.append(input_json)
    return jsonify({'order': order}), 201


@app.route('/')
def index():
    return "Hello, World!"

if __name__ == '__main__':
    app.run(debug=True)
