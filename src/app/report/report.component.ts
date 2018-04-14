import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  reports: any;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('/api').subscribe(data => {
      this.reports = data;
    });
  }

  
}
