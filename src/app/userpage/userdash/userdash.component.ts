import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../authentication.service';
import { HttpClient,HttpParams } from '@angular/common/http';
import * as moment from 'moment';

@Component({
  selector: 'app-userdash',
  templateUrl: './userdash.component.html',
  styleUrls: ['./userdash.component.scss']
})



export class UserdashComponent implements OnInit {
  
  userData:any = {};
  newReports:any = []; // idk why but the http get command does not return an array so newReports should be declared as an array
  pendingReports: any = [];
  constructor(public auth: AuthenticationService,private http: HttpClient) { }

  ngOnInit() {

    var id = this.auth.getUserDetails()._id;
    this.http.get('/api/user/'+id).subscribe(data => {
      
      this.userData = data; 

      });

      
    //http call for the data

    // get pending for dashboard
    let stateList = ['pending']
    let Params = new HttpParams();
    Params = Params.append('state', stateList.join(', '));



    this.http.get('/api/userreports/'+id,{ params: Params }).subscribe(data => {
      

        for (var temp in data){

          var tempDate = data[temp].occurred_date;
          data[temp].occurred_date = moment(tempDate).format('lll');  
          data[temp].timePassed = moment(tempDate).fromNow();
  
        }
        this.pendingReports=data; 

      });
    
      console.log("==================");
      
      this.http.get('/api/cat').subscribe(data => {     
           
        // var tempDate = data["occurred_date"];
        // data["occurred_date"] = moment(tempDate).format("MMM Do YYYY");  
        // this.timePassed = moment(tempDate).fromNow();
        // this.setCenter(data["loc_y"],data["loc_x"]);
        // this.report = data;        
       console.log(data);
      });
      console.log("==================");  

      //get subscriptions
    this.http.get('/api/subscriptions/'+id).subscribe(data => {
      
      for (var temp in data){

        var tempDate = data[temp].occurred_date;
        data[temp].occurred_date = moment(tempDate).format('lll');  
        data[temp].timePassed = moment(tempDate).fromNow();

      }
      this.newReports=data; 
    });




  }

}
