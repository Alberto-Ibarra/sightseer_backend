const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const Sight = require('./models/sights.js');

app.use(express.json());
app.use(cors());

const albertLogin = "admin:admin"



const mongoURI = 'mongodb+srv://'+albertLogin+'@cluster0.nrs7e1s.mongodb.net/sightseer?retryWrites=true&w=majority';
const db = mongoose.connection;
mongoose
	.connect(mongoURI)
	.then(() => {
		console.log('connection to mongo is established');
	})
	.catch((err) => {
		console.log('failed to connect to mongo:', err);
	});


app.listen(3000, ()=>{
    console.log("listening on port 3000");
});