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
        var map;

        if (null != this.leafletDirective.getMap()) {
            return this.leafletDirective.getMap();

       }
    }


    ngAfterViewInit(){                  ///<<@@@ no need to use nativeElement
      }
 }