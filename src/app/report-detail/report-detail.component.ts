import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-report-detail',
  templateUrl: './report-detail.component.html',
  styleUrls: ['./report-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ReportDetailComponent implements OnInit {

  report = {};

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.getReportDetail(this.route.snapshot.params['id']);
  }

  getReportDetail(id) {
    this.http.get('/api/'+id).subscribe(data => {
      this.report = data;
    });
  }

}