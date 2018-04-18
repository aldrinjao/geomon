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
           

      for (var temp in data){
        data[temp].occured_date = moment(data[temp].occured_date).format('lll');  
      }
      
      this.reports = data;
    });
  }

  
}
