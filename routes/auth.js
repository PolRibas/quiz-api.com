'use strict';

const express = require('express');
const createError = require('http-errors');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

router.get('/me', async (req, res, next) => {
    console.log(req.session.user)
	try {
		const user = await User.findById(req.session.user._id)
		res.status(200).json(user);
	} catch (error) {
		next(error);
	};
});

router.post('/login', async (req, res, next) => {
	const { username, password } = req.body;
	try {
		const user = await User.findOne({ username })
		if (!user) {
			next(createError(404));
		} else if (bcrypt.compareSync(password, user.password)) {
			req.session.user = user;
			return res.status(200).json(user);
		} else {
			next(createError(401));
		};
	} catch (error) {
		next(error);
	};
});

router.post('/signup', async (req, res, next) => {
	const { username, email, password } = req.body;
	try {
		const emailfind = await User.findOne({ email }, 'email');
		const user = await User.findOne({ username }, 'username');
		if (user || emailfind) {
			return next(createError(422));
		} else {
			const salt = bcrypt.genSaltSync(10);
			const hashPass = bcrypt.hashSync(password, salt);
			const newUser = await User.create({ username, password: hashPass, email });
            const user = await User.findById(newUser._id)
            req.session.user = user;
			res.status(200).json(user);
		};
	} catch (error) {
		next(error);
	};
});

router.post('/logout', (req, res, next) => {
	req.session.destroy();
	return res.status(204).send();
});

module.exports = router;
