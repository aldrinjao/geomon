var mongoose = require('mongoose');
var ReportSchema = new mongoose.Schema({
    report_id: String,
    title: String,
    reported_by: String,
    description: String,
    category: String,
    loc_x: Number,
    loc_y: Number,
    updated_date: { type: Date, default: Date.now },
    occured_date: { type: Date, default: Date.now },
  });
  

module.exports = mongoose.model('Report', ReportSchema);

// curl -i -X POST -H "Content-Type: application/json" -d '{ "report_id":"1234423443","title":"Learn how to build modern web application with MEAN stack","reported_by": "Didin J.","description":"The comprehensive step by step tutorial on how to build MEAN (MongoDB, Express.js, Angular 5 and Node.js) stack web application from scratch","category":"fire","loc_x":10.1234,"loc_y":125.23123 }' localhost:3000/api

// var lat:number = 14 + Math.random() 
// var long:number =120 + Math.random() 

// export class Event {

//   constructor(
//     public name: string,
//     public description: string,
//     public category: string,
//     public occured_date: Date, 
//     public reported_by,
//     public loc_x:number,
//     public loc_y:number,
//   ) {  }

// }
