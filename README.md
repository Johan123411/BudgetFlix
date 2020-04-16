### BudgetFlix
Instructions to run this project:

### React
Go to the client folder and run these commands: 
1) `npm install`
2) `npm start`

### NodeJS Server 
Go to the server folder and run these commands: 
1) `npm install`
2) `npm start`

### Flask:
First Install python3.7 or Anaconda 3.7 from "https://www.anaconda.com/distribution/"
Install these two libraries from command prompt / terminal:
1) `pip install keras`
2) `pip install tensorflow`

Go to the server folder and run the command:
1) `python app.py`

##### Flask Server Request and Response:

REQUEST: 
1) Make a GET or POST request to localhost:5000/
2) It expects a JSON object: `{ 'favorites': [Array of integers (Movie IDs)] }`

RESPONSE: 
1) Returns a JSON object: `{'recommendations' : [Array of 20 integers (Movie IDs: Top 20 recommendations)] }`


NOTE: 
The AWS account associated with this project is where all movies are stored, since they weren't legally owned by us we were forced to close the AWS account associated with it. 
