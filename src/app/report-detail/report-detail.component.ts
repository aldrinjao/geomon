import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment'; // add this 1 of 4

import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import * as L from 'leaflet';


@Component({
  selector: 'app-report-detail',
  templateUrl: './report-detail.component.html',
  styleUrls: ['./report-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ReportDetailComponent implements OnInit {

  report: any = {};
  
  timePassed;
  myFeatureGroup;
  marker;
  map;


  landslideIcon = L.icon({
    iconUrl: '../assets/red_marker.png',

    iconSize:     [50, 50], // size of the icon
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
  });

  options = {
    layers: [
      L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
    ],
    zoom: 6,
    center: L.latLng({ lat: 12.2, lng: 123.4 }),
  };

  setCenter(ylat,xlong){


    this.marker = L.marker([ylat,xlong],{icon: this.landslideIcon}).addTo(this.map);
    this.map.setView([ylat,xlong], 9);
  }

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.getReportDetail(this.route.snapshot.params['id']);
  }

  getReportDetail(id) {
    this.http.get('/api/'+id).subscribe(data => {

        var tempDate = data["occured_date"];
        data["occured_date"] = moment(tempDate).format("MMM Do YYYY");  
        this.timePassed = moment(tempDate).fromNow();
        this.setCenter(data["loc_y"],data["loc_x"]);
        this.report = data;
       });
  }

  onMapReady(map){
    this.map = map;

  }
}