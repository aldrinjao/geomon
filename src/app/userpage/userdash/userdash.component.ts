import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../authentication.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-userdash',
  templateUrl: './userdash.component.html',
  styleUrls: ['./userdash.component.scss']
})



export class UserdashComponent implements OnInit {
  
  userData:any = {};
 
  constructor(public auth: AuthenticationService,private http: HttpClient) { }

  ngOnInit() {

    var id = this.auth.getUserDetails()._id;
    this.http.get('/api/user/'+id).subscribe(data => {
      
      this.userData = data; 

      });
  

  }

}
