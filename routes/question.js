'use strict';

const express = require('express');
const createError = require('http-errors');
const router = express.Router();
const Question = require('../models/Question');

router.get('/', async (req, res, next) => {
	try {
		const questions = await Question.find()
		res.status(200).json(questions);
	} catch (e){
		next(e);
	};
});

router.get('/:type', async (req, res, next) => {
    const { type } = req.params;
	try {
		const questions = await Question.find({type})
		res.status(200).json(questions);
	} catch (e){
		next(e);
	};
});

router.post('/', async (req, res, next) => {
    const {title, type, description, answer, posibles, haveFormation, formation} = req.body
	try {
		const newQuestion = await Question.create({type, title, description, answer, posibles, haveFormation, formation});
		res.status(200).json(newQuestion);
	} catch (e){
		next(e);
	};
});

router.post('/:type', async (req, res, next) => {
    const { type } = req.params;
    const {title, description, answer, posibles, haveFormation, formation} = req.body
	try {
		const newQuestion = await Question.create({type, title, description, answer, posibles, haveFormation, formation});
		res.status(200).json(newQuestion);
	} catch (e){
		next(e);
	};
});


module.exports = router;