import { Component, OnInit} from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';

import 'style-loader!leaflet/dist/leaflet.css';
import { forEach } from '@angular/router/src/utils/collection';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})


export class MapComponent implements OnInit {

  @Output() notifyParent: EventEmitter<any> = new EventEmitter();
  @Output() open: EventEmitter<any> = new EventEmitter();


  constructor(private http: HttpClient) { }

  public myFeatureGroup;
  public marker;
  public test:number;
  public id:number;
  public reports: any;
  public mapReference;


  public OpenTopoMap =L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});

  public Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});



  public baseMaps = {
    "Grayscale": this.OpenTopoMap,
    "Streets": this.Esri_WorldImagery
  };
  options = {
    layers: [
      this.OpenTopoMap
    ],
    zoom: 6,
    center: L.latLng({ lat: 12.196486, lng: 123.28553643124997 }),
  };


//aets
  //icons initialization
  iconsize = [30,45];


  pestIcon = L.icon({
    iconUrl: '../assets/ico/pest.png',

    iconSize:     this.iconsize, // size of the icon
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
  });

  fireIcon = L.icon({
    iconUrl: '../assets/ico/fire.png',

    iconSize:     this.iconsize, // size of the icon
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
  });  



  landslideIcon = L.icon({
    iconUrl: '../assets/ico/landslide.png',

    iconSize:     this.iconsize, // size of the icon
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
  });

  ngOnInit(){
    

    
  }

  makeMarker(marker:any,map){

     //replace this with retrieve markers
    
     var lat:number = marker.loc_y;
     var long:number = marker.loc_x; 
 
    
     var icontype:string;
 
     var markerIcon;

     var randicon = Math.round(Math.random() * 2)
 
     if (marker.category === "pest"){
       markerIcon = this.pestIcon;
       icontype = "pest" ;
     }
     
     else if(marker.category === "landslide"){
 
       markerIcon = this.landslideIcon;
       icontype = "landslide";
     }
     else if (marker.category==="fire"){
 
       markerIcon = this.fireIcon;
       icontype = "fire";
     }
     
     this.marker = L.marker([lat, long],{icon: markerIcon}).addTo(map).addTo(this.myFeatureGroup);
     this.marker.test = this.id;
     this.marker.icontype = icontype;

  }


  //call generate markers after retrieving from database


  groupClick = (event) => {

    this.notifyParent.emit(event.layer);
  }

  onMapReady(map) {

    this.mapReference=map;
    this.myFeatureGroup= L.featureGroup().addTo(map).on("click", this.groupClick);
  


    this.http.get('/api').subscribe(data => {
      this.reports = data;
      //pass the data
      //method to load all markers
      //method to load metadata to markers
      for (var key in this.reports){
        // console.log(rep.title);
        if (this.reports.hasOwnProperty(key)) {
          this.makeMarker(this.reports[key],map)
        }
      }
      
    });
    // L.control.layers(this.baseMaps,null,{collapsed:false}).addTo(map);
    
  }

  openS:boolean=false;
  esri:boolean=true;

  changeLayer(){

  }  

  removeLayer(){
    this.mapReference.removeLayer(this.myFeatureGroup);
  }


  searchFlag  :boolean = false;
  filterFlag  :boolean = false;
  infoFlag    :boolean = false;
  settingsFlag:boolean = false;

  addClass(id: any) {

    if (id === "filter"){
 
      this.filterFlag = !this.filterFlag;
      this.searchFlag = false;
      this.infoFlag = false;
      this.settingsFlag = false;
    }
 
    if (id === "search"){
 
      this.filterFlag = false;
      this.searchFlag = !this.searchFlag;
      this.infoFlag = false;
      this.settingsFlag = false;
    }
 
    if (id === "info"){
      this.filterFlag = false;
      this.searchFlag = false;
      this.infoFlag = !this.infoFlag;
      this.settingsFlag = false;
    }
 
    if (id === "settings"){
      this.filterFlag = false;
      this.searchFlag = false;
      this.infoFlag = false;
      this.settingsFlag = !this.settingsFlag;
    }

  }
  seasons = [
    'Street Map',
    'World Imagery'
  ];
}
