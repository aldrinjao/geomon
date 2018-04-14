var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Report = require('../models/Report.js');

/* GET ALL REPORTS */
router.get('/', function(req, res, next) {
  Report.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET SINGLE REPORT BY ID */
router.get('/:id', function(req, res, next) {
  Report.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE REPORT */
router.post('/', function(req, res, next) {
  Report.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE REPORT */
router.put('/:id', function(req, res, next) {
  Report.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE REPORT */
router.delete('/:id', function(req, res, next) {
  Report.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;