# AutoEncoders

# Importing the libraries
import numpy as np
import pandas as pd
from keras.layers import Input, Dense
from keras.models import Model, load_model

# Importing the dataset
movies = pd.read_csv('ml-1m/movies.dat', sep = '::', header = None, engine = 'python', encoding = 'latin-1')
users = pd.read_csv('ml-1m/users.dat', sep = '::', header = None, engine = 'python', encoding = 'latin-1')
ratings = pd.read_csv('ml-1m/ratings.dat', sep = '::', header = None, engine = 'python', encoding = 'latin-1')

movies = movies.rename(columns = {0: 'Movie ID', 1: 'Name', 2: 'Genre'})
users = users.rename(columns = {0: 'User ID', 1: 'Sex', 2: 'Categorical 1', 3: 'Categorical 2', 4: 'ZIP Code'})
ratings = ratings.rename(columns = {0: 'User ID', 1: 'Movie ID', 2: 'Rating', 3: 'Timestamp'})

# Showcase Movies
print('Movies:')
print(movies.head())

# Showcase Users
print('\nUsers: ')
print(users.head())

# Showcase Ratings
print('\nRatings:')
print(ratings.head())


# Preparing the training set and the test set
#training_set = pd.read_csv('ml-100k/u1.base', delimiter = '\t')
#training_set = np.array(training_set, dtype = 'int')
#test_set = pd.read_csv('ml-100k/u1.test', delimiter = '\t')
#test_set = np.array(test_set, dtype = 'int')

dataset = np.array(ratings, dtype = 'int')

# Getting the number of users and movies
#nb_users = int(max(max(training_set[:,0]), max(test_set[:,0])))
#nb_movies = int(max(max(training_set[:,1]), max(test_set[:,1])))

nb_users = int(max(dataset[:,0]))
nb_movies = int(max(dataset[:,1]))

print('Number of users in our dataset:', nb_users)
print('Number of movies in our dataset:', nb_movies)

# Converting the data into an array with users in lines and movies in columns
def convert(data):
    new_data = []
    for id_users in range(1, nb_users + 1):
        id_movies = data[:,1][data[:,0] == id_users]
        id_ratings = data[:,2][data[:,0] == id_users]
        ratings = np.zeros(nb_movies)
        ratings[id_movies - 1] = id_ratings
        new_data.append(list(ratings))
    return new_data
dataset = convert(dataset)
#
#input_vector = [1, 2, 3, 4, 5]
#
#def input_conversion(data):
#    ratings = np.zeros(nb_movies)
#    for id in data:
#        ratings[id] = 1
#    ratings = ratings.reshape(1, -1)
#    return ratings
#convert = input_conversion(input_vector)
#training_set = convert(training_set)
#test_set = convert(test_set)

# Find Mean of number of ratings given by every user - Helps in selecting the number of neurons in hidden layers
#counts = []
#for data in dataset:
#    count = 0
#    for rating in data:
#        if rating != 0:
#            count = count + 1
#    counts.append(count)
#print("Mean of number of ratings given by users is", np.asarray(counts).mean())

dataset = np.array(dataset)
#training_set = np.array(training_set)
#test_set = np.array(test_set)

dataset.shape[1]
    
input_img= Input(shape=(dataset.shape[1],))
encoded = Dense(units=128, activation='relu')(input_img)
encoded = Dense(units=64, activation='relu')(encoded)
encoded = Dense(units=32, activation='relu')(encoded)
decoded = Dense(units=64, activation='relu')(encoded)
decoded = Dense(units=128, activation='relu')(decoded)
decoded = Dense(units=dataset.shape[1], activation='sigmoid')(decoded)

autoencoder=Model(input_img, decoded)

autoencoder.compile(optimizer='adadelta', loss='binary_crossentropy', metrics=['accuracy'])

autoencoder.fit(dataset, dataset,
                epochs=100,
                batch_size=256,
                shuffle=True,
                validation_data=(dataset, dataset))

autoencoder.save('autoencoder.h5')
autoencoder = load_model('autoencoder.h5')

input_var = dataset[5].reshape(1, -1)
preds = autoencoder.predict(input_var)

preds = preds.reshape(-1, 1)

recommendations = []
for index in range(len(preds)):
    recommend_dict = {'movie_id': index, 'rating': preds[index, 0]}
    recommendations.append(recommend_dict)
recommendations = sorted(recommendations, key=lambda k: k['rating'], reverse = True) 


#
#inputs = request.json['favorites']
#    input_vector = input_conversion(inputs)
#    with g.as_default():
#        recommendations = autoencoder.predict(input_vector)
#    return jsonify({'recommendations' : recommendations})
