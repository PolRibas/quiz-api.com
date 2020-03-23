'use strict';

const express = require('express');
const createError = require('http-errors');
const router = express.Router();

router.get('/', async (req, res, next) => {
  res.send("Hola boludo")
});


module.exports = router;
