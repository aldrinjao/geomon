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
  
  eventModel = new Event('','','pests',new Date(),1,2);

    report = {};

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

  saveReport() {
    
    if (this.markerCount==0){
      this.showError();

    }else{

      this.eventModel.lat = 3;
      this.eventModel.long = 4;
      console.log("submit");
      console.log(this.eventModel);
      this.showSuccess();

    }
    
    //if not empty here post here
    // this.http.post('/api', this.report)
    //   .subscribe(res => {
    //       let id = res['_id'];
    //       this.router.navigate(['/user']);
    //     }, (err) => {
    //       console.log(err);
    //     }
    //   );
      
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
      

      if(this.markerCount==0){
        this.marker = L.marker(e.latlng,{icon: this.landslideIcon,draggable:true}).addTo(map)
        this.markerCount=this.markerCount+1;
      }
      

    });
    

  }

}