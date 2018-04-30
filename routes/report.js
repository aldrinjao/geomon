var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Report = require('../models/Report.js');
var user = require('../models/Users.js');
var Categorymodel = require('../models/Categories.js');


var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

var ctrlProfile = require('../api/controllers/profile');
var ctrlAuth = require('../api/controllers/authentication');

var data = {};



/* GET ALL REPORTS */

router.get('/', function(req, res, next) {
  Report.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  }).sort({occurred_date: -1});
});

//CATEGORIES

router.get('/cat', function(req, res, next) {
  Categorymodel.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

router.post('/cat', function(req, res, next) {
  Categorymodel.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.put('/cat/:id', function(req, res, next) {

  console.log(req.body);
  user.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
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



// USER Functions

//get all reports by a user

router.get('/userreports/:id', function(req, res, next) {
  whereClause:any = {};
  if (req.query.state === "pending"){

    whereClause= {
      reported_by:req.params.id,
      approved: 'pending'
    }

  }else if (req.query.state === "approved"){
    whereClause= {
      reported_by:req.params.id,
      approved: 'approved'
    }

  }else {
    whereClause= {
      reported_by:req.params.id
    }


  }
  Report.find(whereClause,function (err, products) {

    if (err) return next(err);
    res.json(products);
  });
}); 


//get all reports for a user's subscription

//get a user's subscriptions then query
router.get('/subscriptions/:id', function(req, res, next) {
  
  user.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    this.data = post;
    
    Report.find({category:this.data.subscriptions},function (err, products) {
      if (err) return next(err);
      res.json(products);
      
    }).sort({occurred_date: -1});
  
  });
 
});

router.get('/subscriptionslist/:id', function(req, res, next) {
  
  user.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    
    res.json(post);

  });
 
});


router.get('/user/:id', function(req, res, next) {
  user.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});





// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);


module.exports = router;