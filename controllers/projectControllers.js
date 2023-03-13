const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Sight = require('../models/sights.js');

// router.get('/', (req, res) => {
// 	res.json({ usingThisController: true });
// });

// Index
router.get('/', async (req, res) => {
	try {
		const allSights = await Sight.find({});
		res.json(allSights);
	} catch (err) {
		console.log(err);
	}
});

// New
router.post('/', async (req, res) => {
	try {
		const addSight = await Sight.create(req.body);
		res.json(addSight);
	} catch (err) {
		console.log(err);
	}
});

// Delete
router.delete('/:id', async (req, res) => {
	try {
		const deleteSights = await Sight.findByIdAndDelete(req.params.id);
		res.json(deleteSights);
	} catch (err) {
		console.log(err);
	}
});

// Update
router.put('/:id', async (req, res) => {
	try {
		const updatedSights = await Sight.findByIdAndUpdate(
			req.params.id,
			req.body,
			{
				new: true,
			}
		);
		res.json(updatedSights);
	} catch (err) {
		console.log(err);
	}
});

// Filter by Continent
router.get('/:continent', async (req, res) => {
	try {
		const continent = req.params.continent;
		const sights = await Sight.find({ continent });
		res.json(sights);
	} catch (err) {
		console.log(err);
	}
});

module.exports = router;
