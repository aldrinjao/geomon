import { Directive} from '@angular/core';
import { LeafletModule,LeafletDirective } from '@asymmetrik/ngx-leaflet';

@Directive({
    selector: '[myCustomDirective]'
 })
 export class MyCustomDirective {
    leafletDirective: LeafletDirective;
     
    constructor(leafletDirective: LeafletDirective) {
       this.leafletDirective = leafletDirective;
    }
 
    someFunction() {
        console.log("333");
       if (null != this.leafletDirective.getMap()) {
          // Do stuff with the map
       }
    }
    someFunction2() {
        console.log("3222233");
       return this.leafletDirective.getMap();
    }
 }