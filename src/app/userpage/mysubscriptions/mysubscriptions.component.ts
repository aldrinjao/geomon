import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../authentication.service';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mysubscriptions',
  templateUrl: './mysubscriptions.component.html',
  styleUrls: ['./mysubscriptions.component.scss']
})
export class MysubscriptionsComponent implements OnInit {

  public userData:any ={}; 
  public newReports:any = []; // idk why but the http get command does not return an array so newReports should be declared as an array
  public categories:any = [];
  public subslist:any =[];

  constructor(public auth: AuthenticationService,private http: HttpClient) { }

  ngOnInit() {
    


    // load the categories list for the checkboxes
    var id = this.auth.getUserDetails()._id;


    this.http.get('/api/subscriptions/'+id).subscribe(data => {
    
      for (var temp in data){

        var tempDate = data[temp].occurred_date;
        data[temp].occurred_date = moment(tempDate).format('lll');  
        data[temp].timePassed = moment(tempDate).fromNow();

      }
      this.newReports=data;
    });

    this.http.get('/api/subscriptionslist/'+id).subscribe(data => {
      this.subslist = data["subscriptions"]; 
    });

    
    this.http.get('/api/cat').subscribe(data => {
      
      for (var temp in data){

        data[temp].checked = this.setChecked(data[temp].name);  

      }

      this.categories = data;
   });
  }


  setChecked(category:string){


    console.log(category+" "+this.subslist.includes(category));
    if (this.subslist.includes(category)){
      return true;
    }else{
      return false;
    }
  }

  isSelected(topic){
   
    
    return this.subslist.indexOf(topic) >= 0;
  }

  editSubs(){
    //if a category is true, insert into array then call http for updating the user's subscriptions
    console.log(this.categories);
  }

}
