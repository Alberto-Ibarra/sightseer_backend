const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/userModel.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require("../auth.js");
// login
// const loginUser = async(req,res) => {
//     try {
//         res.json({message:'login'});
//     } catch(err) {
//         console.log(err);
//     }
// };

router.get('/', async (req, res) => {
	try {
		const allUsers = await User.find({});
		console.log(allUsers);
		// res.json(allUsers);
	} catch (err) {
		console.log(err);
	}
});
router.post('/register', async (req, res) => {
	try {
		const hashedPassword = await bcrypt.hash(req.body.password, 10);
		const user = await User.create({
			email: req.body.email,
			password: hashedPassword,
		});
		const result = await user.save();
		res.status(201).send({
			message: 'User Created Successfully',
			result,
		});
	} catch (error) {
		res.status(500).send({
			message: 'Error creating user',
			error,
		});
	}
});
router.post('/login', async (req, res) => {
	try {
		const user = await User.findOne({ email: req.body.email });
		if (!user) {
			return res.status(404).send({
				message: 'email not found',
				error: 'user not found',
			});
		}

	const passwordCheck = await bcrypt.compare(
			req.body.password,
			user.password
		);
		if (!passwordCheck) {
			return res.status(400).send({
				message: 'password does not match',
				error: 'Incorrect password',
			});
		}

		const token = jwt.sign(
			{
				userId: user._id,
				userEmail: user.email,
			},
			'RANDOM-TOKEN',
			{ expiresIn: '24h' }
		);	

		res.status(200).send({
			message: 'login successful',
			email: user.email,
			token,
		});
	} catch (error) {
		res.status(400).send({
			message: 'An error occurred',
			error,
		});
	}
});
router.get('/free-endpoint', (req, res) => {
	res.json({ message: 'You are free to access me anytime' });
});

// authentication endpoint
router.get('/auth-endpoint', auth, (req, res) => {
	res.json({ message: 'You are authorized to access me' });
});
module.exports = router;
