// ---- THIS FILE CONNECTS ALL FILES TO THE SERVER -------


// express framework to create your own server API associated with HTTP requests
const express = require('express');

// import mongoose
const mongoose = require('mongoose');

//  instantiate (represent) the server. Done so we can later chain on methods to the express.js server
const app = express();

// constant for PORT (specific address of the server. Like an apartment number)
// process.env.PORT is the environment heroku sets when run || or use chosen PORT
const PORT = process.env.PORT || 3001;

//  ------ parse in order for our server to accept incoming data the way we need it to
// app.use() method mounts a function to server. 

// Parse incoming JSON data into req.body
app.use(express.json());

// parse incoming string or array data
// express.urlencoded converts POST data to key/value pairings that can be accessed in req.body object
// extended: true informs server that there may be sub array data nested
app.use(express.urlencoded({ extended: true }));
// express.static method provides path for public which holds the front-end code. 
app.use(express.static('public'));

// mongoose.connect tells Mongoose which database we want to connect to. Use either variable or server database. Whatever is available
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/pizzahut', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.set('debug', true);


app.use(require('./routes'));

// make mongoose data show in terminal 


// this listen method makes our server listen
app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));