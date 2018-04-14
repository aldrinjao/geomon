import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA, Directive } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { ReportComponent } from './report/report.component';
import { RouterModule, Routes } from '@angular/router';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ReportDetailComponent } from './report-detail/report-detail.component';
import { ReportCreateComponent } from './report-create/report-create.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { MapComponent } from './map/map.component';
import { FrontpageComponent } from './frontpage/frontpage.component';
import { UserpageComponent } from './userpage/userpage.component';
import { ReactiveFormsModule } from '@angular/forms';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';


import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';


import { MapService } from "./map.service";
import { GeocodingService } from "./geocoding.service";

const appRoutes: Routes = [
  {
    path: 'reports',
    component: FrontpageComponent,
    data: { title: 'Book List' }
  },
  {
    path: 'report',
    component: FrontpageComponent,
    data: { title: 'Book List' }
  },
  { path: '',
    redirectTo: '/reports',
    pathMatch: 'full'
  },
  {
    path: 'report-details/:id',
    component: ReportDetailComponent,
    data: { title: 'Report Details' }
  },{
    path: 'report-create',
    component: ReportCreateComponent,
    data: { title: 'Report Event' }
  },
  {
    path: 'user',
    component: UserpageComponent,
    data: { title: 'User Page' }
  },


  { path: '**', component: PagenotfoundComponent }

];

@NgModule({
  declarations: [
    AppComponent,
    ReportComponent,
    PagenotfoundComponent,
    ReportDetailComponent,
    ReportCreateComponent,
    NavbarComponent,
    FooterComponent,
    MapComponent,
    FrontpageComponent,
    UserpageComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot(),
    LeafletModule.forRoot(),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    FormsModule, 
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
    NgbModule.forRoot(),
    ToastrModule.forRoot(
      {
        progressBar: true
      }
    ), // ToastrModule added
  ],
  providers: [MapService, GeocodingService],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
