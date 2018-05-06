import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment'; // add this 1 of 4

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  reports: any;
  constructor(private http: HttpClient) {}

  ngOnInit() {

    
    this.http.get('/api').subscribe(data => {     
           
      // var tempDate = data["occurred_date"];
      // data["occurred_date"] = moment(tempDate).format("MMM Do YYYY");  
      // this.timePassed = moment(tempDate).fromNow();
      // this.setCenter(data["loc_y"],data["loc_x"]);
      // this.report = data;




      for (var temp in data){
        data[temp].occurred_date = moment(data[temp].occurred_date).format('lll');  
        data[temp].timePassed = moment(data[temp].occurred_date).fromNow();

      }
      
      this.reports = data;
    });
  }

  
}
