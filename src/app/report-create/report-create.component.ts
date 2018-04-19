import { Component, OnInit, ViewEncapsulation,Directive, Testability } from '@angular/core';
import { Router } from '@angular/router';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Event} from './event';

@Component({
  selector: 'app-report-create',
  templateUrl: './report-create.component.html',
  styleUrls: ['./report-create.component.scss'],
  encapsulation: ViewEncapsulation.None
})






export class ReportCreateComponent implements OnInit {


  marker = L.marker();
  model:string = "";
  
  eventModel = new Event('','','pest',new Date(),'',0,0);


  constructor(private http: HttpClient, private router: Router,private toastr: ToastrService) {}
  
  options = {
    layers: [
      L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
    ],
    zoom: 6,
    center: L.latLng({ lat: 12.196486, lng: 123.28553643124997 }),
  };



  ngOnInit() {

  }

  showSuccess() {
    this.toastr.success('Event Submitted for Approval');
  }

  showError(){
    this.toastr.error('Please place a marker!');
  }

  value = '';



  //called when submit is clicked
  saveReport() {
    
    if (this.markerCount==0){
      this.showError();

    }else{
      //replace the reported by assignment to userid when user accounts are implemented
      this.eventModel.reported_by = "user_id";

      // update the eventmodel to the latest marker position
      this.eventModel.loc_x = this.marker._latlng.lng;
      this.eventModel.loc_y = this.marker._latlng.lat;



      console.log("submit");
      console.log(this.eventModel);
      
      this.showSuccess();

      this.callhttp();
    }
      
  }

  callhttp(){

     this.http.post('/api', this.eventModel)
      .subscribe(res => {
          let id = res['_id'];
          this.router.navigate(['/report-create']);
        }, (err) => {
          console.log(err);
        }
      );
    
    console.log("call http");
  }


  landslideIcon = L.icon({
    iconUrl: '../assets/red_marker.png',

    iconSize:     [50, 50], // size of the icon
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
  });


  markerCount:number = 0;

  center = L.latLng({ lat: 12.196486, lng: 123.28553643124997 });

  
  onMapReady(map) {

    map.on('click', <LeafletMouseEvent>(e) => { 
      
      // update marker info everytime the map is clicked
      if(this.markerCount==0){
        this.marker = L.marker(e.latlng,{icon: this.landslideIcon,draggable:true}).addTo(map)
        this.markerCount=this.markerCount+1;
      }

      this.eventModel.loc_x = e.latlng.lat;
      this.eventModel.loc_y = e.latlng.lng;
    });
    

  }

}