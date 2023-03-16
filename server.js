const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const logger = require('morgan');
const bcrypt = require('bcrypt');

const User = require('./models/userModel.js');
const Sight = require('./models/sights.js');
// controllers

const projectController = require('./controllers/projectControllers');
const userController = require('./controllers/userController');
require('dotenv').config();

// middleware
app.use(express.json());
app.use(cors());
app.use(logger('dev'));

app.use('/sights', projectController);
app.use('/users', userController);

const mongoURI = process.env.MONGODB;

const db = mongoose.connection;
mongoose
	.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })

	.then(() => {
		console.log('connection to mongo is established');
		const usersCollection = db.collection('users');
	});
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
	);
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, PUT, DELETE, PATCH, OPTIONS'
	);
	next();
});
app.listen(3000, () => {
	console.log('listening on port 3000');
});

// BEFORE ROUTERS

// app.post('/sights', async (req, res) => {
// 	const addSight = await Sight.create(req.body);
// 	res.json(addSight);
// });

// app.get('/sights', async (req, res) => {
// 	const allSights = await Sight.find({});
// 	res.json(allSights);
// });

// app.delete('/sights/:id', async (req, res) => {
// 	const deleteSights = await Sight.findByIdAndDelete(req.params.id);
// 	res.json(deleteSights);
// });

// app.put('/sights/:id', async (req, res) => {
// 	const updatedSights = await Sight.findByIdAndUpdate(req.params.id, req.body, {
// 		new: true,
// 	});
// 	res.json(updatedSights);
// });
// app.get('/', (req, res) => {
// 	res.json({ success: true });
// });

// Worst Case.  need to make dry.

// app.get('/sights/asia/', async (req, res) => {
// 	const continent = await Sight.find({ continent: 'Asia' });
// 	res.json(continent);
// });
// app.get('/sights/africa/', async (req, res) => {
// 	const continent = await Sight.find({ continent: 'Africa' });
// 	res.json(continent);
// });
// app.get('/sights/northamerica/', async (req, res) => {
// 	const continent = await Sight.find({ continent: 'North America' });
// 	res.json(continent);
// });
// app.get('/sights/southamerica/', async (req, res) => {
// 	const continent = await Sight.find({ continent: 'South America' });
// 	res.json(continent);
// });
// app.get('/sights/europe/', async (req, res) => {
// 	const continent = await Sight.find({ continent: 'Europe' });
// 	res.json(continent);
// });
// app.get('/sights/australia/', async (req, res) => {
// 	const continent = await Sight.find({ continent: 'Australia' });
// 	res.json(continent);
// });

// app.get('/sights/:continent', async (req, res) => {
// 	const continent = req.params.continent;
// 	const sights = await Sight.find({ continent });
// 	res.json(sights);
// });
