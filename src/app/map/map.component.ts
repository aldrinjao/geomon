import { Component, OnInit,ViewChild} from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';
import {MyCustomDirective} from './map.directive';


import 'style-loader!leaflet/dist/leaflet.css';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})



export class MapComponent implements OnInit {

  @ViewChild(MyCustomDirective) vc:MyCustomDirective;
  constructor(private http: HttpClient) { }

  public myFeatureGroup;
  public myFeatureGroup2;

  public pestLayer;
  public landslideLayer;
  public fireLayer;

  public marker;
  public test:number;
  public id:number;
  public reports: any;
  mapreference;


  googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});

  Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

  Esri_WorldTopoMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
});

Stamen_Terrain = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
	subdomains: 'abcd',
	minZoom: 0,
	maxZoom: 18,
	ext: 'png'
});
CartoDB_DarkMatter = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
	subdomains: 'abcd',
	maxZoom: 19
});


  baseMaps = {
    "Google Streets": this.googleStreets,
    "ESRI World Imagery": this.Esri_WorldImagery,
    "ESRI WorldTopoMap": this.Esri_WorldTopoMap,
    "Stamen Terrain": this.Stamen_Terrain,
    "CartoDB DarkMatter":this.CartoDB_DarkMatter
  };

  options = {
    layers: [
      this.googleStreets
    ],
    zoom: 6,
    center: L.latLng({ lat: 12.196486, lng: 123.28553643124997 }),
    zoomControl: false
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

  // mymap= L.map('mapid').setView([51.505, -0.09], 13);



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
       this.marker = L.marker([lat, long],{icon: markerIcon}).addTo(this.pestLayer);
      }
     
     else if(marker.category === "landslide"){
 
       markerIcon = this.landslideIcon;
       icontype = "landslide";
       this.marker = L.marker([lat, long],{icon: markerIcon}).addTo(this.landslideLayer);

      }
     else if (marker.category==="fire"){
 
       markerIcon = this.fireIcon;
       icontype = "fire";
       this.marker = L.marker([lat, long],{icon: markerIcon}).addTo(this.fireLayer);

      }
     
    //  this.marker = L.marker([lat, long],{icon: markerIcon}).addTo(map).addTo(this.myFeatureGroup);
     
     this.marker.test = this.id;
     this.marker.icontype = icontype;

  }




  // groupClick = (event) => {

  //   this.notifyParent.emit(event.layer);
  // }

  onMapReady(map) {

    // this.myFeatureGroup= L.featureGroup().addTo(map).on("click", this.groupClick);
    
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


    // this.fireLayer = L.featureGroup().addTo(map).on("click", this.groupClick);
    
    this.fireLayer = L.featureGroup().addTo(map).on("click", this.groupClick.bind(this));
    this.pestLayer = L.featureGroup().addTo(map).on("click", this.groupClick.bind(this));
    this.landslideLayer = L.featureGroup().addTo(map).on("click", this.groupClick.bind(this));
    
    L.control.layers(this.baseMaps).addTo(map);
    L.control.zoom({
      position:'topright'
    }).addTo(map);
  
  }
  fireFlag = true;
  floodFlag = true;
  landslideFlag = true;
  pestFlag = true;

  toggleSlide(id:any){
    this.mapreference = this.vc.someFunction();


    if (id==1){
      this.landslideFlag = !this.landslideFlag;
      if (this.landslideFlag){
        this.landslideLayer.addTo(this.mapreference);
       
        
      } else{
        this.mapreference.removeLayer(this.landslideLayer);
          
      }   
      
    }
    if (id==2){
      this.fireFlag = !this.fireFlag;
      if (this.fireFlag){
        this.fireLayer.addTo(this.mapreference);
       
        
      } else{
        this.mapreference.removeLayer(this.fireLayer);
          
      }   
      
    }    
    if (id==3){
      this.pestFlag = !this.pestFlag;
      if (this.pestFlag){
        this.pestLayer.addTo(this.mapreference);
       
        
      } else{
        this.mapreference.removeLayer(this.pestLayer);
          
      }   
      
    }


  }


  public event_content:any;

  groupClick(e){

    console.log(e);
    this.event_content = e.layer.icontype; 

  }


  
  ngAfterViewInit(){   
    this.vc.someFunction();                 ///<<@@@ no need to use nativeElement
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


  isClosed:boolean= false;

  buttonArrow(){
    this.isClosed = !this.isClosed;

  }         


}
