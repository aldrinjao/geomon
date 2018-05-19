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
        console.log(this.leafletDirective.getMap()); 
        if (null == this.leafletDirective.getMap()) {
            console.log("null");
       }
       console.log("444")
    }


    someFunction2() {
        console.log("bbbb");
       return this.leafletDirective.getMap();
    }

    ngAfterViewInit(){                  ///<<@@@ no need to use nativeElement
      }
 }