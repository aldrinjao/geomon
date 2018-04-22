var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Report = require('../models/Report.js');
var user = require('../models/Users.js');


var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

var ctrlProfile = require('../api/controllers/profile');
var ctrlAuth = require('../api/controllers/authentication');





/* GET ALL REPORTS */

router.get('/', function(req, res, next) {
  Report.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  }).sort({occured_date: -1});
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




router.get('/user/:id', function(req, res, next) {
  console.log("get single user");
  user.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

// profile
  router.get('/profile', auth, ctrlProfile.profileRead);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);


module.exports = router;