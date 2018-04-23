import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../authentication.service';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';

@Component({
  selector: 'app-userdash',
  templateUrl: './userdash.component.html',
  styleUrls: ['./userdash.component.scss']
})



export class UserdashComponent implements OnInit {
  
  userData:any = {};
  newReports:any = []; // idk why but the http get command does not return an array so newReports should be declared as an array

  constructor(public auth: AuthenticationService,private http: HttpClient) { }

  ngOnInit() {

    var id = this.auth.getUserDetails()._id;
    this.http.get('/api/user/'+id).subscribe(data => {
      
      this.userData = data; 

      });

      
    //http call for the data

    // get pending for dashboard
    this.http.get('/api/userreports/'+id).subscribe(pendingReports => {
      
        console.log(pendingReports);    
      });

    //get subscriptions
    this.http.get('/api/subscriptions/'+id).subscribe(data => {
      
      for (var temp in data){

        var tempDate = data[temp].occured_date;
        data[temp].occured_date = moment(tempDate).format('lll');  
        data[temp].timePassed = moment(tempDate).fromNow();

      }
      this.newReports=data; 
    });

  }

  testfunct(a){
    return a;
  }
}
