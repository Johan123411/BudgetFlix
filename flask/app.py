import numpy as np
import random
import tensorflow as tf
from flask import Flask, jsonify, request
from keras.models import load_model

app = Flask(__name__)

def input_conversion(data):
    
    ratings = np.zeros(3952)
    for id in data:
        ratings[id - 1] = random.choice([3, 4, 5])
    ratings = ratings.reshape(1, -1)
    return ratings

@app.route('/', methods=['GET', 'POST'])
def get_predictions():
    inputs = request.json['favorites']
    input_vector = input_conversion(inputs)
    
    with g.as_default():
        preds = autoencoder.predict(input_vector)
    
    preds = preds.reshape(-1, 1)
    
    recommendations = []
    sorted(preds)
    for index in range(len(preds)):
        recommend_dict = {'movie_id': index + 1, 'rating': preds[index, 0]}
        recommendations.append(recommend_dict)
    recommendations = sorted(recommendations, key=lambda k: k['rating'], reverse = True) 
    
    # Return top 20 movies
    final_array = []
    for r in recommendations:
        final_array.append(r['movie_id'])
        if len(final_array) == 20:
            break
    return jsonify({'recommendations' : final_array})

if __name__ == '__main__':
    g = tf.Graph()
    with g.as_default():
        print(" * Loading model")
        autoencoder = load_model('autoencoder.h5')
        print(" * Autoencoder Neural Network Loaded")
    app.run()