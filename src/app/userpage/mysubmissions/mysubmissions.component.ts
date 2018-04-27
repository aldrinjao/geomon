import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../authentication.service';
import { HttpClient,HttpParams } from '@angular/common/http';
import * as moment from 'moment';


@Component({
  selector: 'app-mysubmissions',
  templateUrl: './mysubmissions.component.html',
  styleUrls: ['./mysubmissions.component.scss']
})
export class MysubmissionsComponent implements OnInit {

  constructor(public auth: AuthenticationService,private http: HttpClient) { }

  userData:any ={}; 
  myReports:any = []; // idk why but the http get command does not return an array so newReports should be declared as an array
  


  ngOnInit() {
  
    var id = this.auth.getUserDetails()._id;

    let stateList = []
    let Params = new HttpParams();
    Params = Params.append('state', stateList.join(', '));



    this.http.get('/api/userreports/'+id,{ params: Params }).subscribe(data => {
    
      for (var temp in data){

        var tempDate = data[temp].occurred_date;
        data[temp].occurred_date = moment(tempDate).format('lll');  
        data[temp].timePassed = moment(tempDate).fromNow();

      }
      this.myReports=data; 
    });

  }

}
