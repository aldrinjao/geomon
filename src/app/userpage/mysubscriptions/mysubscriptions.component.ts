import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../authentication.service';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


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
  public id;

  constructor(public auth: AuthenticationService,private http: HttpClient,private router: Router,private toastr: ToastrService) { }

  ngOnInit() {
    


    // load the categories list for the checkboxes
    this.id = this.auth.getUserDetails()._id;

    this.http.get('/api/subscriptionslist/'+this.id).subscribe(data => {
      this.subslist = data["subscriptions"]; 
    });



        
    this.http.get('/api/cat').subscribe(data => {
      
      for (var temp in data){

        data[temp].checked = this.setChecked(data[temp].name);  

      }

      this.categories = data;
   });

    this.http.get('/api/subscriptions/'+this.id).subscribe(data => {
    
      for (var temp in data){

        var tempDate = data[temp].occurred_date;
        data[temp].occurred_date = moment(tempDate).format('lll');  
        data[temp].timePassed = moment(tempDate).fromNow();

      }
      this.newReports=data;
    });




  }


  setChecked(category:string){

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
    //call http to update the subscriptions
    var tempArray = [];
    for(var i=0;i<this.categories.length;i++){
      if  (this.categories[i].checked){
        console.log(this.categories[i].name);
        tempArray.push(this.categories[i].name);
      }else{

      }
    }

    var userSubs = {
      subscriptions:tempArray
    }

      this.http.put('/api/cat/'+this.id,userSubs).subscribe(res => {
        console.log("success");
      }, (err) => {
        console.log(err);
      }
    );

    location.reload();
  }

 

}
