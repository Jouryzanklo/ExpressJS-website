/*
This code is written by Joury Zanklo
*/

// Strict mode to prevent code mistakes (better and clearer code) or undeclared variables
'use strict';
var express = require('express');
var session = require('express-session'); // For session management
var bodyParser = require('body-parser');  // To be able to handle HTTP-POST requests
var bcrypt = require('bcrypt'); // Bcrypt library to hash users' passwords
var path = require('path');
var app = express();

const saltRounds = 10; // Saltround for the hash

// Making sessoin for the connection
app.use(session({
	secret: '***',
	resave: true,
	saveUninitialized: true
}));


// For the web-app to be able to handle HTTP-POST requests
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

// Defining the static files' path
app.use(express.static(path.join(__dirname, '/html')));

// Mustache engine to load HTML pages
var engines = require('consolidate');
app.set('views', __dirname + '/html');
app.engine('html', engines.mustache);
app.set('view engine', 'html');

// The first page when opening the website
app.get('/', function(request, response) {
	response.render('login.html');
});

// Preparing the database
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://***:***.112@xr-fx.ensb1.mongodb.net/***?retryWrites=true&w=majority";
let dbo;
MongoClient.connect(url, function(err, db) {
if (err) throw err;
dbo = db.db("user");
});

// The authentication for the login (with hash checking)
app.post('/auth', function(request, response) {
	//Saving the provided username and password in variables
	var username = request.body.username;
	var password = request.body.password;
	// Making sure that the user provided credentials
	if (username && password) {
		// Connecting to the database and checking the credentials
    let theCollection = dbo.collection('users').findOne({username: username});
    theCollection.then(function(dbResult) {
			bcrypt.compare(password, dbResult.password)
            .then(passwordIs => {
			        if (dbResult.username == username && passwordIs == true) {
			            request.session.loggedin = true;
			            request.session.username = username;
			            response.redirect('/home')
			        }
							// If the provided credentials are wrong
			        else {
							response.send('Incorrect Username and/or Password!');
						}
			response.end();})
			.catch(err => console.error(err.message));
		})
		.catch(
            function(){
						// If the user doesn't exist
            response.send(`User doesn't exist`);
            response.end();
        });
	}

	else {
		// If the user tried to login without any credentials
		response.send('Please enter Username and Password!');
		response.end();
	}
});

// The sign up function (with hash)
app.post('/sign_up' ,function(req,res){
    bcrypt
    .hash(req.body.password, saltRounds)
    .then(hash => {
		// saving the password hashed (10 salt rounds)
        var password = (hash);
        var name = req.body.username;
        var email= req.body.email;
        var phone = req.body.phone;
        let data = {
            "username":name,
            "email":email,
            "password": password,
            "phone" : phone
        }
				// Inserting the information in the database
        dbo.collection('users').insertOne(data, (err, collection) =>{
            if(err) throw err;
            });
    })
    .catch(err => console.error(err.message));
	// After signing up the user will be redirected to success.html where he/she can be redirected to the login page
	return res.sendFile(path.join(__dirname + '/html/success.html'));

});


// If the user tried to access the website without logging in, he/she will be redirected to login
app.get('/home', function(request, response) {
	if (request.session.loggedin) {
		return response.sendFile(path.join(__dirname + '/html/main.html'));
	}
	else {
		response.send('Please login first to see the page!');
	}
	response.end();
});


// In case the user requested a page that doesn't exist (Error handling)
app.use((req, res,next) =>{
   res.render('404.html');
});

// The host and the port
const PORT = 8080;
const HOST = '0.0.0.0';
app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
