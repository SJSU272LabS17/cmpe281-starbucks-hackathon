#!flask/bin/python

from flask import jsonify
from flask import Flask
from flask import request
from flask import json
from flask.ext.pymongo import PyMongo
from pymongo import MongoClient
import json
from bson import ObjectId

class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        return json.JSONEncoder.default(self, o)


client = MongoClient('mongodb://localhost:27017/')
db = client.orders
orders = db.orders

app = Flask(__name__)
mongo = PyMongo(app)

@app.route('/sanjose/orders', methods=['GET'])
def get_orders():
    data = {}
    cursor = orders.find({})
    data = []
    for c in cursor:
	print c
        data.append({'coffeename': c['coffeename'], 'mugsize': c['mugsize'], 'ID': c['_id']})	
    return jsonify({'status': 'ok', 'orders': JSONEncoder().encode(data)
})


@app.route('/sanjose/orders/<order_id>', methods=['GET'])
def get_order(order_id):
    orderone = orders.find_one({'_id' : ObjectId(order_id)})
    print orderone
    print "Hello "
    return jsonify({'order': JSONEncoder().encode(orderone)})

@app.route('/sanjose/orders', methods=['POST'])
def create_task():
    input_json = request.json 
    order = {
        "coffeename": request.json['coffeename'],
        "mugsize": request.json['mugsize']
    }
    order_id = orders.insert_one(order).inserted_id
    print order_id
    return jsonify({"Order ": "Order placed successfully"})

@app.route('/sanjose/orders/<order_id>', methods=['DELETE'])
def delete_task(order_id):
    result = orders.delete_one({'_id': ObjectId(order_id)})
    print result
    return jsonify({'result': True})

@app.route('/')
def index():
    return "Hello, World!"

if __name__ == '__main__':
    app.run(debug=True)
