export class Event {

  constructor(
    public title: string,
    public description: string,
    public category: string,
    public occurred_date: Date, 
    public reported_by,
    public loc_x:number,
    public loc_y:number,
    public approved:string
  ) {  }

}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license


var ReportSchema = new mongoose.Schema({
    report_id: String,
    title: String,
    reported_by: String,
    description: String,
    category: String,
    loc_x: Number,
    loc_y: Number,
    updated_date: { type: Date, default: Date.now },
  });
  






*/